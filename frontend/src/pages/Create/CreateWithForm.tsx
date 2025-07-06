import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Divider,
  Grid,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import schema from "./createSchemaValidation";
import { useLocation } from "react-router-dom";

interface EducationEntry {
  school: string;
  degree: string;
  startMonthYear: string;
  endMonthYear: string;
}

interface ExperienceEntry {
  company: string;
  role: string;
  startMonthYear: string;
  endMonthYear: string;
  responsibilities: string;
}

interface ProjectEntry {
  name: string;
  description: string;
}

interface PortfolioFormValues {
  name: string;
  about: string;
  phNumber?: string;
  email?: string;
  linkedIn?: string;
  github?: string;
  education: EducationEntry[];
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  skills: { value: string }[];
}

export default function CreatePortfolioPage() {
  const title = useLocation().state.title;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PortfolioFormValues>({
    resolver: yupResolver(schema as yup.ObjectSchema<PortfolioFormValues>),
    defaultValues: {
      name: "",
      about: "",
      phNumber: "",
      email: "",
      linkedIn: "",
      github: "",
      education: [
        { school: "", degree: "", startMonthYear: "", endMonthYear: "" },
      ],
      experience: [
        {
          company: "",
          role: "",
          startMonthYear: "",
          endMonthYear: "",
          responsibilities: "",
        },
      ],
      projects: [{ name: "", description: "" }],
      skills: [{ value: "" }],
    },
  });

  const educationFields = useFieldArray({ control, name: "education" });
  const experienceFields = useFieldArray({ control, name: "experience" });
  const projectFields = useFieldArray({ control, name: "projects" });
  const skillFields = useFieldArray({ control, name: "skills" });

  const onSubmit = (data: PortfolioFormValues | string) => {
    console.log("Submitted Portfolio:", data);
  };

  return (
    <Box className="min-h-screen bg-gradient-to-bl from-gray-200 to-gray-400 px-4 py-8 flex flex-col items-center justify-center">
      <Typography variant="h4" sx={{ color: grey[800], pb: 2 }}>
        <b>{title}</b> Portfolio
      </Typography>
      <Box className="max-w-4xl w-full bg-gray-100 p-6 rounded-xl shadow">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Typography variant="h6" mb={1}>
            Personal Information
          </Typography>
          <Grid container spacing={1}>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                label="Full Name"
                id="name"
                fullWidth
                required
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                label="Phone Number"
                id="phNumber"
                fullWidth
                {...register("phNumber")}
                error={!!errors.phNumber}
                helperText={errors.phNumber?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                label="Email"
                id="email"
                fullWidth
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="LinkedIn Profile"
                id="linkedIn"
                fullWidth
                {...register("linkedIn")}
                error={!!errors.linkedIn}
                helperText={errors.linkedIn?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="GitHub Profile"
                id="github"
                fullWidth
                {...register("github")}
                error={!!errors.github}
                helperText={errors.github?.message}
              />
            </Grid>
            <TextField
              label="About"
              id="about"
              fullWidth
              required
              multiline
              minRows={4}
              {...register("about")}
              error={!!errors.about}
              helperText={errors.about?.message}
            />
          </Grid>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" mb={1}>
            Education
          </Typography>
          {educationFields.fields.map((field, index) => (
            <div key={field.id} className="mb-4">
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 11 }}>
                  <Grid container spacing={1}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        label="School"
                        fullWidth
                        required
                        {...register(`education.${index}.school`)}
                        error={!!errors.education?.[index]?.school}
                        helperText={errors.education?.[index]?.school?.message}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        label="Degree"
                        fullWidth
                        required
                        {...register(`education.${index}.degree`)}
                        error={!!errors.education?.[index]?.degree}
                        helperText={errors.education?.[index]?.degree?.message}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        label="Start Month - Year"
                        fullWidth
                        required
                        {...register(`education.${index}.startMonthYear`)}
                        error={!!errors.education?.[index]?.startMonthYear}
                        helperText={
                          errors.education?.[index]?.startMonthYear?.message
                        }
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        label="End Month - Year"
                        fullWidth
                        required
                        {...register(`education.${index}.endMonthYear`)}
                        error={!!errors.education?.[index]?.endMonthYear}
                        helperText={
                          errors.education?.[index]?.endMonthYear?.message
                        }
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  size={{ xs: 12, sm: 1 }}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <IconButton onClick={() => educationFields.remove(index)}>
                    <Delete />
                  </IconButton>
                </Grid>
              </Grid>
            </div>
          ))}

          <Button
            onClick={() =>
              educationFields.append({
                school: "",
                degree: "",
                startMonthYear: "",
                endMonthYear: "",
              })
            }
            startIcon={<Add />}
            sx={{
              color: grey[800],
              "&:hover": {
                backgroundColor: grey[300],
              },
            }}
          >
            Add Education
          </Button>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" mb={1}>
            Work Experience
          </Typography>
          {experienceFields.fields.map((field, index) => (
            <div key={field.id} className="mb-4">
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 11 }}>
                  <Grid container spacing={1}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        label="Company"
                        fullWidth
                        required
                        {...register(`experience.${index}.company`)}
                        error={!!errors.experience?.[index]?.company}
                        helperText={
                          errors.experience?.[index]?.company?.message
                        }
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        label="Degree"
                        fullWidth
                        required
                        {...register(`experience.${index}.role`)}
                        error={!!errors.experience?.[index]?.role}
                        helperText={errors.experience?.[index]?.role?.message}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        label="Start Month - Year"
                        fullWidth
                        required
                        {...register(`experience.${index}.startMonthYear`)}
                        error={!!errors.experience?.[index]?.startMonthYear}
                        helperText={
                          errors.experience?.[index]?.startMonthYear?.message
                        }
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        label="End Month - Year"
                        fullWidth
                        required
                        {...register(`experience.${index}.endMonthYear`)}
                        error={!!errors.experience?.[index]?.endMonthYear}
                        helperText={
                          errors.experience?.[index]?.endMonthYear?.message
                        }
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12 }}>
                      <TextField
                        label="Responsibilities"
                        multiline
                        minRows={4}
                        fullWidth
                        required
                        {...register(`experience.${index}.responsibilities`)}
                        error={!!errors.experience?.[index]?.responsibilities}
                        helperText={
                          errors.experience?.[index]?.responsibilities?.message
                        }
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  size={{ xs: 12, sm: 1 }}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <IconButton onClick={() => experienceFields.remove(index)}>
                    <Delete />
                  </IconButton>
                </Grid>
              </Grid>
            </div>
          ))}
          <Button
            onClick={() =>
              experienceFields.append({
                company: "",
                role: "",
                startMonthYear: "",
                endMonthYear: "",
                responsibilities: "",
              })
            }
            startIcon={<Add />}
            sx={{
              color: grey[800],
              "&:hover": {
                backgroundColor: grey[300],
              },
            }}
          >
            Add Experience
          </Button>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" mb={1}>
            Projects
          </Typography>
          {projectFields.fields.map((field, index) => (
            <div key={field.id} className="mb-4">
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 11 }}>
                  <Grid container spacing={1}>
                    <Grid size={{ xs: 12, sm: 12 }}>
                      <TextField
                        label="Project Name"
                        fullWidth
                        required
                        {...register(`projects.${index}.name`)}
                        error={!!errors.projects?.[index]?.name}
                        helperText={errors.projects?.[index]?.name?.message}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12 }}>
                      <TextField
                        label="Description"
                        fullWidth
                        required
                        {...register(`projects.${index}.description`)}
                        error={!!errors.projects?.[index]?.description}
                        helperText={
                          errors.projects?.[index]?.description?.message
                        }
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  size={{ xs: 12, sm: 1 }}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <IconButton onClick={() => projectFields.remove(index)}>
                    <Delete />
                  </IconButton>
                </Grid>
              </Grid>
            </div>
          ))}
          <Button
            onClick={() => projectFields.append({ name: "", description: "" })}
            startIcon={<Add />}
            sx={{
              color: grey[800],
              "&:hover": {
                backgroundColor: grey[300],
              },
            }}
          >
            Add Project
          </Button>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" mb={1}>
            Skills
          </Typography>
          {skillFields.fields.map((field, index) => (
            <Box key={field.id} className="flex gap-2 mb-2">
              <TextField
                label="Skill"
                fullWidth
                required
                {...register(`skills.${index}.value`)}
                error={!!errors.skills?.[index]?.value}
                helperText={errors.skills?.[index]?.value?.message}
              />
              <IconButton onClick={() => skillFields.remove(index)}>
                <Delete />
              </IconButton>
            </Box>
          ))}
          <Button
            onClick={() => skillFields.append({ value: "" })}
            startIcon={<Add />}
            sx={{
              color: grey[800],
              "&:hover": {
                backgroundColor: grey[300],
              },
            }}
          >
            Add Skill
          </Button>

          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: grey[800],
                borderRadius: 2,
                px: 4,
                py: 1.5,
                "&:hover": { backgroundColor: grey[900] },
              }}
            >
              Generate
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
