import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  about: yup.string().required("About is required"),
  education: yup.array().of(
    yup.object().shape({
      school: yup.string().required("School is required"),
      degree: yup.string().required("Degree is required"),
      startMonthYear: yup.string().required("Start month-year is required"),
      endMonthYear: yup.string().required("End month-year is required"),
    })
  ),
  experience: yup.array().of(
    yup.object().shape({
      company: yup.string().required("Company is required"),
      role: yup.string().required("Role is required"),
      startMonthYear: yup.string().required("Start month-year is required"),
      endMonthYear: yup.string().required("End month-year is required"),
      responsibilities: yup.string().required("Responsibilities are required"),
    })
  ),
  projects: yup.array().of(
    yup.object().shape({
      name: yup.string().required("Project name is required"),
      description: yup.string().required("Description is required"),
    })
  ),
  skills: yup
    .array()
    .of(yup.object().shape({ value: yup.string().required() })),
});

export default schema;
