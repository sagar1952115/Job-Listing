import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Typography,
  darken,
} from "@mui/material";
import user1 from "../assets/user1.jpeg";
import user2 from "../assets/user2.jpeg";
import { toTitleCase } from "../utils/utils";

const JobCard = ({ d }) => {
  return (
    <Card
      key={d.jdUid}
      sx={{
        mt: 4,
        maxWidth: 345,
        boxShadow: 3,
        borderRadius: 5,
        height: "100%",
      }}
    >
      <CardContent>
        <Chip
          label="⌛ Posted 10 days ago"
          variant="outlined"
          sx={{
            borderColor: "lightgrey",
            boxShadow: "0px 1px lightgrey",
            borderRadius: 3,
            padding: 0.1,
          }}
        />
      </CardContent>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar alt="Remy Sharp" src={d.logoUrl} sx={{ mr: 1 }} />
          <Box>
            <Typography
              sx={{ color: "text.secondary", fontWeight: "bold", fontSize: 20 }}
            >
              {toTitleCase(d.companyName)}
            </Typography>
            <Typography sx={{ fontSize: 20 }}>
              {toTitleCase(d.jobRole)}
            </Typography>
          </Box>
        </Box>
        <Typography sx={{ ml: 6, fontSize: 14, fontWeight: "650" }}>
          {toTitleCase(d.location)}
        </Typography>
        <Typography sx={{ mt: 2, fontWeight: "bold", color: "text.secondary" }}>
          Estimated Salary: {d.salaryCurrencyCode} {d.minJdSalary} -
          {d.maxJdSalary} K ✅
        </Typography>
        <Typography className="fadedtext" sx={{ mt: 2, height: 200 }}>
          <b> Job Description </b> <br />
          {d.jobDetailsFromCompany}
        </Typography>
        <Button
          sx={{
            width: "100%",
            textAlign: "center",
            zIndex: 999,
            mt: -0.5,
            color: "#4943da",
          }}
        >
          View Job
        </Button>

        <Typography
          sx={{
            marginBottom: 1,
            marginTop: 1,
            color: "text.secondary",
          }}
        >
          Minimum Experience:
          <Typography
            sx={{
              color: "text.secondary",
              fontWeight: "bold",
            }}
          >
            {d.minExp || 0} years
          </Typography>
        </Typography>

        <Button
          variant="contained"
          sx={{
            width: "100%",
            backgroundColor: "#54efc3",
            borderRadius: 2,

            mb: 2,
            paddingY: 2,
            textTransform: "none", // Convert text to lowercase
            "&:hover": {
              backgroundColor: darken("#54efc3", 0.2),
              color: "white", // Darken background color on hover
            },
          }}
        >
          <Typography color="black" fontWeight="bold">
            ⚡ Easy Apply
          </Typography>
        </Button>
        <Button
          variant="contained"
          sx={{
            width: "100%",
            paddingY: 2,
            borderRadius: 2,
            backgroundColor: "#4943da",
            textTransform: "none", // Convert text to lowercase
            "&:hover": {
              backgroundColor: darken("#4943da", 0.2), // Darken background color on hover
            },
          }}
        >
          <AvatarGroup max={3} sx={{ mr: 1 }}>
            <img
              src={user1}
              alt="Image 1"
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                marginRight: 5,
                filter: "blur(1px)",
              }}
            />
            <img
              src={user2}
              alt="Image 2"
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                filter: "blur(1px)",
              }}
            />
          </AvatarGroup>
          <Typography color="white">Unlock referral asks</Typography>
        </Button>
      </CardContent>
    </Card>
  );
};

export { JobCard };
