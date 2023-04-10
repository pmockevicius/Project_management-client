import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom"; // <== IMPORT
import AddTask from "../components/AddTask";   //  <== IMPORT 
import TaskCard from "../components/TaskCard"; //  <== IMPORT
 
const API_URL = "http://localhost:5005";
 
function ProjectDetailsPage (props) {
  const [project, setProject] = useState(null);
  const { projectId } = useParams();
  
  
  const getProject = () => {
    axios
      .get(`${API_URL}/api/projects/${projectId}`)
      .then((response) => {
        const oneProject = response.data;
        setProject(oneProject);
      })
      .catch((error) => console.log(error));
  };
  
  
  useEffect(()=> {
    getProject();
  }, [] );
 
  
  return (
    <div className="ProjectDetails">
      {project && (
        <>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
        </>
      )}
      
      <AddTask refreshProject={getProject} projectId={projectId} />    
 
       {/* Below: UPDATE */}      
      { project && project.tasks.map((task) => (
        <TaskCard key={task._id} {...task} /> 
      ))} 
      
 
      <Link to="/projects">
        <button>Back to projects</button>
      </Link>
      
      <Link to={`/projects/edit/${projectId}`}>
        <button>Edit Project</button>
      </Link>      
      
    </div>
  );
}
 
export default ProjectDetailsPage;
 