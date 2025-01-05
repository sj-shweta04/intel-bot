import { useRef } from "react";
import { alpha, styled } from "@mui/material/styles";
import {
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 64;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "auto",
  [theme.breakpoints.up("lg")]: {
    width: "100%",
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up("lg")]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 1),
  },
}));

export default function Navbar({ onOpenSidebar }) {
  const ref = useRef(null);
  const isSmallLaptop = useMediaQuery("(max-width: 1200px)");

  return (
    <RootStyle>
      <ToolbarStyle>
        {isSmallLaptop && (
          <IconButton
            sx={{
              height: "3%",
              backgroundColor: "White",
              "&:hover": {
                backgroundColor: "#F5F5F5",
              },
              color: "#3892CF",
            }}
            variant="text"
            onClick={onOpenSidebar}
          >
            <MenuIcon fontSize="normal" />
          </IconButton>
        )}
        <Stack direction="row" alignItems="center"></Stack>
      </ToolbarStyle>
      <div
        style={{
          width: "100%",
          borderTop: "1.8px solid #EAECF0",
        }}
      />
    </RootStyle>
  );
}
