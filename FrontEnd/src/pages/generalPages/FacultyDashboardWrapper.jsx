import { useParams } from "react-router-dom";
import FacultyDashboard from "./FacultyDashboard";

export default function FacultyDashboardWrapper() {
  const { facultyId } = useParams();
  return <FacultyDashboard facultyId={facultyId} />;
}
