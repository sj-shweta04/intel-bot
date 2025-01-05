import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import AssistantAI from "./AssistantAI";

const InteliconvoBot = () => {
  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <div
        className="Navbar"
        style={{
          height: "64px", // Same as APPBAR_MOBILE/APPBAR_DESKTOP
          flexShrink: 0,
        }}
      >
        <Navbar />
      </div>

      <div
        className="MainContent"
        style={{
          display: "flex",
          flex: 1,
          overflow: "hidden",
        }}
      >
        <div
          className="Sidebar"
          style={{
            flexShrink: 0,
            backgroundColor: "#f8f9fa",
          }}
        >
          <Sidebar />
        </div>

        <div
          className="AssistantAI"
          style={{
            flex: 1,
            overflow: "auto",
            padding: "10px",
          }}
        >
          <AssistantAI />
        </div>
      </div>
    </div>
  );
};

export default InteliconvoBot;
