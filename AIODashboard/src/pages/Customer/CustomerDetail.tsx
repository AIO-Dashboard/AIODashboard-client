import { useParams } from "react-router";
import { useCustomerDetail } from "../../hooks/index";

import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import Spinner from "../../components/Spinner";
import type { User } from "../../types";

export default function CustomerDetail() {
  const { id } = useParams(); // take id from url

  console.log("ProductDetail id:", id);

  const { data, isLoading, isError } = useCustomerDetail<User>(id ? id : "");
  const customer = data && data.data;

  const mask = (value: string, visibleCount = 4) => {
    return value.length > visibleCount
      ? "*".repeat(value.length - visibleCount) + value.slice(-visibleCount)
      : value;
  };

  if (isLoading) {
    return <Spinner text="Loading customer info..." />;
  }

  if (isError) {
    return (
      <Typography variant="h6" color="error" sx={{ m: 4 }}>
        Failed to load customer details. Please try again later.
      </Typography>
    );
  }

  if (!data || !customer) {
    return (
      <Typography variant="h6" color="warning.main" sx={{ m: 4 }}>
        No customer data found.
      </Typography>
    );
  }

  return (
    <>
      <Grid
        sx={{
          marginLeft: {
            xs: "5vw",
          },
        }}
      >
        <Grid size={12}>
          <Typography variant="overline" gutterBottom sx={{ display: "block" }}>
            <h2 style={{ marginBottom: 0 }}>Basic Profile</h2>
          </Typography>
        </Grid>
        <Grid
          container
          spacing={2}
          direction={{ xs: "column-reverse", sm: "row" }}
        >
          <Grid
            size={{ xs: 12, sm: 6, md: 6 }}
            sx={{
              display: {
                xs: "flex",
                sm: "block",
              },
              // justifyContent: {
              // xs: "center", // center children horizontally on extra-small screens
              // sm: "flex-start", // default alignment from sm and up
              // },
            }}
          >
            <Stack direction="column" spacing={1}>
              <h1
                style={{ marginTop: 0 }}
              >{`${customer.firstName} ${customer.lastName}`}</h1>
              <span>Username: {customer.username}</span>
              <span>Email: {customer.email}</span>
              <span>Mobile: {customer.phone}</span>
              <span>
                Home Address:{" "}
                {`${customer.address.address}, ${customer.address.city}`}
              </span>
              <span>Age: {customer.age}</span>
              <span>Date of birth: {customer.birthDate}</span>
            </Stack>
          </Grid>
          <Grid
            size={{ xs: 12, sm: 6, md: 6 }}
            sx={{
              textAlign: "left",
              display: {
                xs: "flex",
                sm: "block",
              },
              // justifyContent: {
              // xs: "center", // center children horizontally on extra-small screens
              //   sm: "flex-start", // default alignment from sm and up
              // },
            }}
          >
            <Box
              component="img"
              src={customer.image || "/react.svg"}
              alt={`${customer.firstName} ${customer.lastName}`}
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/react.svg";
              }}
              sx={{
                width: "100%",
                maxWidth: 200,
                height: "auto",
                borderRadius: 0,
                objectFit: "cover",
                backgroundColor: "#f0f0f0",
              }}
            />
          </Grid>
          {/* </Grid> */}
        </Grid>
        <Grid container spacing={2}>
          <Grid
            size={{ xs: 12, sm: 6, md: 6 }}
            sx={{
              display: {
                xs: "flex",
                sm: "block",
              },
              // justifyContent: {
              // xs: "center", // center children horizontally on extra-small screens
              //   sm: "flex-start", // default alignment from sm and up
              // },
            }}
          >
            <section>
              <Typography
                variant="overline"
                gutterBottom
                sx={{ display: "block" }}
              >
                <h2>Personal Details</h2>
              </Typography>
              <Stack spacing={1}>
                <span>Blood Group: {customer.bloodGroup}</span>
                <span>Eye Color: {customer.eyeColor}</span>
                <span>
                  Hair: {`${customer.hair.type} ${customer.hair.color}`}
                </span>
                <span>Height: {customer.height} cm</span>
                <span>Weight: {customer.weight} kg</span>
                <span>SSN: {mask(customer.ssn)}</span>
                <span>EIN: {mask(customer.ein)}</span>
                <span>University: {customer.university}</span>
              </Stack>
            </section>
          </Grid>
          <Grid
            size={{ xs: 12, sm: 6, md: 6 }}
            sx={{
              display: {
                xs: "flex",
                sm: "block",
              },
              // justifyContent: {
              // xs: "center", // center children horizontally on extra-small screens
              //   sm: "flex-start", // default alignment from sm and up
              // },
            }}
          >
            <section>
              <Typography
                variant="overline"
                gutterBottom
                sx={{ display: "block" }}
              >
                <h2>Work & Financial</h2>
              </Typography>
              <Stack spacing={1}>
                <span>Company: {customer.company.name}</span>
                <span>Title: {customer.company.title}</span>
                <span>Department: {customer.company.department}</span>
                <span>
                  Work Location:{" "}
                  {`${customer.company.address.address}, ${customer.company.address.city}`}
                </span>

                <span>
                  Bank: {customer.bank.cardType} -{" "}
                  {mask(customer.bank.cardNumber)}
                </span>
                <span>IBAN: {mask(customer.bank.iban)}</span>
                <span>
                  Crypto: {customer.crypto.coin} ({customer.crypto.network})
                </span>
                <span>Wallet: {mask(customer.crypto.wallet)}</span>
              </Stack>
            </section>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
