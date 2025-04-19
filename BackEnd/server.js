const express = require("express");
const postgres = require("postgres");
const sql = require("./dbconnect");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors()); // This allows your frontend to talk to the backend

// Route to authenticate user
app.post("/login", async (req, res) => {
  const { faculty_id, password } = req.body;

  try {
    const result = await sql`
      SELECT authenticate_user(${faculty_id}, ${password}) AS auth_result
    `;

    if (result[0].auth_result === 1) {
      res.status(200).json({ success: true, message: "Login successful" });
    } else {
      res.status(200).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Authentication failed:", error);
    res.status(500).json({ success: false, message: "Database Server error" });
  }
});

app.get("/faculty/:id", async (req, res) => {
  const facId = parseInt(req.params.id);
  console.log(facId);
  try {
    const result = await sql`
      SELECT * FROM get_faculty_details(${facId})
    `;
    res.json(result);
  } catch (err) {
    console.error("Error fetching faculty:", err);
    res.status(500).send("Internal server error");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.post("/update-faculty", async (req, res) => {
  const { faculty_id, name, phone, email, dname, college_name, password } =
    req.body;
  console.log(req.body);
  try {
    const result = await sql`
      SELECT try_update_faculty_details(
        ${faculty_id},
        ${name},
        ${phone},
        ${email},
        ${dname},
        ${college_name},
        ${password}
      ) as status;
    `;
    if (result[0].status === 1) {
      res.json({ success: true, message: "Faculty updated successfully" });
    } else {
      res.status(404).json({
        success: false,
        message: "Faculty not found or update failed",
      });
    }
  } catch (err) {
    console.error("Error updating faculty:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post("/add-faculty", async (req, res) => {
  const { name, phone, email, dname, college, password } = req.body;

  try {
    const result = await sql`
      SELECT insert_faculty_data(
        ${name}, ${phone}, ${email}, ${dname}, ${college}, ${password}
      ) AS new_fac_id;
    `;

    const insertedId = result[0].new_fac_id;

    if (insertedId !== 0) {
      res.json({
        success: true,
        message: "Faculty inserted",
        faculty_id: insertedId,
      });
    } else {
      res.status(400).json({ success: false, message: "Insertion failed" });
    }
  } catch (err) {
    console.error("Error inserting faculty:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Get list of colleges
app.get("/colleges", async (req, res) => {
  try {
    const colleges = await sql`SELECT name FROM college`;
    res.json({ success: true, colleges });
  } catch (err) {
    console.error("Error fetching colleges:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Get list of departments
app.get("/departments", async (req, res) => {
  try {
    const departments = await sql`SELECT dname FROM department`;
    res.json({ success: true, departments });
  } catch (err) {
    console.error("Error fetching departments:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.get("/fdp/:id", async (req, res) => {
  const fdpId = parseInt(req.params.id);
  if (isNaN(fdpId)) {
    return res.status(400).json({ success: false, message: "Invalid FDP ID" });
  }

  try {
    const result = await sql`SELECT * FROM get_fdp_details(${fdpId})`;

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: "FDP not found" });
    }

    res.json({ success: true, data: result[0] });
  } catch (err) {
    console.error("Error fetching FDP details:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post("/register", async (req, res) => {
  const { faculty_id, fdp_id, payment_status, date } = req.body;

  if (!faculty_id || !fdp_id || !payment_status || !date) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  try {
    const result = await sql`
      SELECT * FROM insert_registration(${faculty_id}, ${fdp_id}, ${payment_status}, ${date})
    `;

    if (result[0].insert_registration > 0) {
      return res
        .status(201)
        .json({ success: true, message: "Registration inserted successfully" });
    } else {
      return res
        .status(500)
        .json({ success: false, message: "Failed to insert registration" });
    }
  } catch (err) {
    console.error("Error inserting registration:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
app.get("/all-fdp", async (req, res) => {
  try {
    const result = await sql`
      SELECT 
        fdp.FDP_ID,
        fdp.TITLE,
        fdp.VENUE,
        fdp.START_DATE,
        fdp.END_DATE,
        fdp.ORGANIZING_DEPARTMENT,
        fdp.ORGANIZING_COLLEGE,
        f.name AS organizer_name,
        f.phone AS organizer_phone
      FROM FDP_PROGRAM fdp
      JOIN FACULTY f ON fdp.ORGANIZER_ID = f.FACULTY_ID;
    `;

    res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.error("Error fetching FDP data:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch FDP details" });
  }
});

app.get("/fdp/:id/sessions", async (req, res) => {
  const fdpId = parseInt(req.params.id);

  try {
    const result = await sql`
      SELECT 
        s.topic,
        s.mode,
        s.duration,
        s.date AS session_date,
        s.time AS session_time,
        f.name AS faculty_name
      FROM session s
      JOIN faculty f ON s.handling_fac_id = f.faculty_id
      WHERE s.fdp_id = ${fdpId}
    `;

    res.json({ success: true, sessions: result });
  } catch (error) {
    console.error("Error fetching session details:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get("/faculty/:id/registered-fdps", async (req, res) => {
  const facultyId = parseInt(req.params.id);

  try {
    const result = await sql`
      SELECT 
        fdp.fdp_id,
        fdp.title AS fdp_title,
        reg.payment_status
      FROM registration reg
      JOIN fdp_program fdp ON reg.fdp_id = fdp.fdp_id
      WHERE reg.faculty_id = ${facultyId}
    `;

    res.json({ success: true, fdps: result });
  } catch (error) {
    console.error("Error retrieving registered FDPs:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get("/fdp/ongoing/:facultyId", async (req, res) => {
  const { facultyId } = req.params;

  try {
    const result = await sql`
      SELECT f.title, f.fdp_id as fdp_id
      FROM participation p
      JOIN fdp_program f ON p.fdp_id = f.fdp_id
      WHERE p.faculty_id = ${facultyId}
        AND f.end_date >= CURRENT_DATE
    `;

    res.json({ success: true, data: result });
  } catch (error) {
    console.error("Error fetching ongoing FDPs:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get("/fdp/completed/:facultyId", async (req, res) => {
  const { facultyId } = req.params;

  try {
    const result = await sql`
      SELECT f.title AS fdp_title, fac.name AS faculty_name,f.fdp_id as fdp_id
      FROM participation p
      JOIN fdp_program f ON p.fdp_id = f.fdp_id
      JOIN faculty fac ON p.faculty_id = fac.faculty_id
      WHERE p.faculty_id = ${facultyId}
        AND f.end_date < CURRENT_DATE
    `;

    res.json({ success: true, data: result });
  } catch (error) {
    console.error("Error fetching completed FDPs:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post("/feedback", async (req, res) => {
  const { faculty_id, fdp_id, rating, comments } = req.body;
  // Basic validation
  if (!faculty_id || !fdp_id || rating == null || comments == null) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  try {
    const result = await sql`
      SELECT insert_feedback(
        ${faculty_id},
        ${fdp_id},
        ${rating},
        ${comments}
      ) AS status;
    `;
    const status = result[0]?.status;
    if (status === 1) {
      res.json({ success: true, message: "Feedback submitted" });
    } else {
      res.status(500).json({ success: false, message: "Submission failed" });
    }
  } catch (err) {
    console.error("Error inserting feedback:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
app.get("/fdp/upcoming/:facultyId", async (req, res) => {
  const { facultyId } = req.params;

  try {
    const result = await sql`
      SELECT * FROM get_upcoming_fdps_with_count(${facultyId});
    `;

    res.json({ success: true, data: result });
  } catch (err) {
    console.error("Error fetching upcoming FDPs:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get("/api/fdp/:fdpId/funding", async (req, res) => {
  const { fdpId } = req.params;
  try {
    const result = await sql`
      SELECT * FROM get_funding_details_by_fdp(${fdpId})
    `;
    res.json(result);
  } catch (error) {
    console.error("Error fetching funding details:", error);
    res.status(500).json({ error: "Failed to fetch funding details" });
  }
});

app.post("/transfer-to-participation/:fdpId", async (req, res) => {
  const fdpId = parseInt(req.params.fdpId);
  try {
    const result = await sql`
      SELECT transfer_registration_to_participation(${fdpId}) AS transferred_count
    `;
    const count = result[0].transferred_count;

    if (count > 0) {
      res.json({
        success: true,
        message: `${count} people moved to participation.`,
      });
    } else {
      res.json({
        success: false,
        message: "No registrations found to transfer.",
      });
    }
  } catch (error) {
    console.error("Error transferring records:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error during transfer" });
  }
});

app.get("/fdp/oongoing/:facultyId", async (req, res) => {
  const facultyId = parseInt(req.params.facultyId);
  console.log(facultyId);
  try {
    const result = await sql`
      SELECT * FROM get_ongoing_fdps_with_participation(${facultyId})
    `;
    console.log(result);

    res.json({ success: true, data: result });
  } catch (error) {
    console.error("Error fetching ongoing FDPs:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get("/organizer/:fdpId/participants", async (req, res) => {
  const fdpId = parseInt(req.params.fdpId);

  try {
    const result = await sql`
      SELECT * FROM get_participants_by_fdp(${fdpId})
    `;
    res.json({ success: true, data: result });
  } catch (error) {
    console.error("Error fetching participants:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.delete("/participation/:facultyId/:fdpId", async (req, res) => {
  const facultyId = parseInt(req.params.facultyId);
  const fdpId = parseInt(req.params.fdpId);

  try {
    const result = await sql`
      DELETE FROM PARTICIPATION 
      WHERE FACULTY_ID = ${facultyId} AND FDP_ID = ${fdpId}
    `;

    if (result.count > 0) {
      res.json({
        success: true,
        message: "Participation entry deleted successfully",
      });
    } else {
      res.status(404).json({ success: false, message: "Entry not found" });
    }
  } catch (error) {
    console.error("Error deleting participation entry:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get("/organizer/coompleted/:facultyId", async (req, res) => {
  const facultyId = parseInt(req.params.facultyId);

  try {
    const result = await sql`
      SELECT * FROM get_completed_fdps_with_participation(${facultyId})
    `;

    res.json({ success: true, data: result });
  } catch (error) {
    console.error("Error fetching completed FDPs:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get("/organizer/issue-certificates/:fdpId", async (req, res) => {
  const fdpId = parseInt(req.params.fdpId);

  try {
    const result = await sql`
      SELECT issue_certificates_for_fdp(${fdpId}) AS count
    `;

    const count = result[0].count;

    if (count > 0) {
      res.json({ success: true, message: `${count} certificates issued.` });
    } else {
      res.status(400).json({
        success: false,
        message: "No certificates issued or no participants found.",
      });
    }
  } catch (error) {
    console.error("Error issuing certificates:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
