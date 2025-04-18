import { useParams } from "react-router-dom";
import FacultyDashboard from "./FacultyDashboard";

export default function FacultyDashboardWrapper() {
  const { id } = useParams();
  return <FacultyDashboard facultyId={id} />;
}
