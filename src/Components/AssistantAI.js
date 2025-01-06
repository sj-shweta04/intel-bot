import React, { useEffect, useRef, useState } from "react";
import {
  TextField,
  Grid,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import MicNoneIcon from "@mui/icons-material/MicNone";
import PhotoSizeSelectActualOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActualOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { styled } from "@mui/system";
import * as XLSX from "xlsx"; // Import SheetJS for Excel export
import { API } from "../E2E/axios.util";

const AssistantAI = () => {
  const [userInput, setUserInput] = useState("");
  const [tableData, setTableData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [showCards, setShowCards] = useState(true);
  const [data, setData] = useState([]);

  const QuestionBackground = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: "center",
    backgroundColor: "#3892CF1A",
    boxShadow: "none",
    borderRadius: "12px",
  }));

  const chatContainerRef = useRef(null);
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [data]);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  // ----------------------------- dummy data call -----------------------------------------------

  // const handleSubmit = async () => {
  //   if (userInput.trim()) {
  //     setUserInput("");
  //     setLoading(true);
  //     setShowTable(false);
  //     setShowCards(false);

  //     // const dummyData = [
  //     //   {
  //     //     Product: "Product A",
  //     //     Interactions: 120,
  //     //     Customers: 30,
  //     //     Channel: "Email",
  //     //   },
  //     //   {
  //     //     Product: "Product B",
  //     //     Interactions: 150,
  //     //     Customers: 45,
  //     //     Channel: "Phone",
  //     //   },
  //     //   {
  //     //     Product: "Product C",
  //     //     Interactions: 80,
  //     //     Customers: 20,
  //     //     Channel: "Chat",
  //     //   },
  //     //   {
  //     //     Product: "Product D",
  //     //     Interactions: 200,
  //     //     Customers: 60,
  //     //     Channel: "Email",
  //     //   },
  //     //   {
  //     //     Product: "Product E",
  //     //     Interactions: 90,
  //     //     Customers: 25,
  //     //     Channel: "Phone",
  //     //   },
  //     // ];

  //     const dummyData = {
  //       agentResponse:
  //         "Can you please specify from which fact table you want this information? Our database has multiple fact tables like cust_experience_fact, interaction_fact, workforce_performance_fact.",
  //       sqlquery:
  //         "SELECT COUNT(interaction_id) AS num_interactions FROM workforce_performance_fact WHERE agent_final_tone = 'low' UNION ALL SELECT COUNT(interaction_id) AS num_interactions FROM cust_experience_fact WHERE customer_final_tone = 'low'",
  //       result: [[134], [122]],
  //     };

  //     setData((prev) => [...prev, { query: userInput, answer: "" }]);

  //     setTimeout(() => {
  //       setTableData(dummyData);

  //       setShowTable(true);
  //       setData((prev) => {
  //         const updatedData = [...prev];
  //         updatedData[updatedData.length - 1].answer = dummyData; // Update the last entry's answer
  //         return updatedData;
  //       });
  //       setLoading(false);
  //     }, 1500);
  //   }
  // };

  // --------------------------------- API CALL ---------------------------------------

  // const handleSubmit = async () => {
  //   if (!userInput.trim()) return;

  //   setUserInput("");
  //   setLoading(true);
  //   setShowTable(false);
  //   setShowCards(false);

  //   try {
  //     setData((prev) => [...prev, { question: userInput, answer: "" }]);
  //     const response = await API.post("/get_bot_response", {
  //       question: userInput,
  //     });

  //     if (response?.data) {
  //       //   setTableData(response?.data); // Assuming the response contains table data
  //       setData((prev) => {
  //         const updatedData = [...prev];
  //         updatedData[updatedData.length - 1].answer = response?.data?.table; // Update the last entry's answer
  //         return updatedData;
  //       });
  //       setShowTable(true);
  //     } else {
  //       console.log("No data received from the API.");
  //     }
  //   } catch (error) {
  //     console.log("Error fetching data from the API:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // ==================================== API CALL NEWWWWWWW =========================
  const handleSubmit = async () => {
    if (!userInput.trim()) return; // If user input is empty, exit early

    setUserInput("");
    setLoading(true);
    setShowTable(false);
    setShowCards(false);

    try {
      setData((prev) => [...prev, { question: userInput, answer: "" }]);

      const response = await API.post("/get_bot_response", {
        question: userInput,
      });

      if (response?.data) {
        setTableData(response.data);
        setData((prev) => {
          const updatedData = [...prev];
          updatedData[updatedData.length - 1].answer = {
            agentResponse: response.data.agent_response,
            sqlquery: response.data.query,
            result: response.data.result,
          };
          return updatedData;
        });

        setShowTable(true);
      } else {
        console.log("No data received from the API.");
      }
    } catch (error) {
      console.log("Error fetching data from the API:", error);
    } finally {
      setLoading(false);
    }
  };

  // ============================= Practice submit DUMMY =============================

  // const handleSubmit = async () => {
  //   if (userInput.trim()) {
  //     setUserInput("");
  //     setLoading(true);
  //     setShowTable(false);
  //     setShowCards(false);

  //     const dummyData = {
  //       agentResponse:
  //         "Can you please specify from which fact table you want this information? Our database has multiple fact tables like cust_experience_fact, interaction_fact, workforce_performance_fact.",
  //       sqlquery:
  //         "SELECT COUNT(interaction_id) AS num_interactions FROM workforce_performance_fact WHERE agent_final_tone = 'low' UNION ALL SELECT COUNT(interaction_id) AS num_interactions FROM cust_experience_fact WHERE customer_final_tone = 'low'",
  //       // result: [
  //       //   { Table: "workforce_performance_fact", Num_Interactions: 134 },
  //       //   { Table: "cust_experience_fact", Num_Interactions: 122 },
  //       // ],
  //       result: [[123]],
  //     };

  //     console.log("User Input:", userInput); // Debug user input
  //     setData((prev) => [...prev, { query: userInput, answer: "" }]);

  //     setTimeout(() => {
  //       console.log("Setting table data:", dummyData);
  //       setTableData(dummyData);

  //       setShowTable(true);
  //       setData((prev) => {
  //         const updatedData = [...prev];
  //         console.log("Previous data:", updatedData);
  //         updatedData[updatedData.length - 1].answer = {
  //           agentResponse: dummyData.agentResponse,
  //           sqlquery: dummyData.sqlquery,
  //           result: dummyData.result,
  //         };
  //         console.log("Updated data:", updatedData);
  //         return updatedData;
  //       });

  //       setLoading(false);
  //     }, 1500);
  //   }
  // };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const renderChat = () => {
    const handleDownload = (data) => {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, "table_data.xlsx");
    };
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          overflow: "auto",
        }}
        ref={chatContainerRef}
      >
        {data.map((item, index) => {
          return (
            <div key={index}>
              {/* Question on the right */}
              {/* <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: "10px",
                  paddingRight: "50px",
                }}
              >
                <QuestionBackground>
                  <Typography variant="body1">{item.question}</Typography>
                </QuestionBackground>
              </div> */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: "10px",
                  paddingRight: {
                    xs: "5px", // 20px padding on extra small screens (phones)
                    sm: "20px", // 30px padding on small screens (small tablets)
                    md: "30px", // 40px padding on medium screens (large tablets)
                    lg: "40px", // 50px padding on large screens (laptops)
                  },
                }}
              >
                <QuestionBackground>
                  <Typography variant="body1">{item.question}</Typography>
                </QuestionBackground>
              </Box>

              <div style={{ paddingLeft: "50px", display: "flex" }}>
                {item?.answer && (
                  <span
                    style={{
                      marginTop: "20px",
                      fontSize: "20px",
                      paddingRight: "10px",
                    }}
                  >
                    &#9679;{" "}
                  </span>
                )}
                {item?.answer && (
                  <div
                    style={{
                      paddingLeft: "50px",
                      border: "1px solid #ccc", // Add a border around the container
                      padding: "10px", // Padding inside the container
                      marginBottom: "20px", // Margin at the bottom
                      maxWidth: "800px", // Maximum width for the container
                      width: "auto", // Adjust width based on content
                      height: "auto", // Adjust height based on content
                      borderRadius: "8px", // Rounded corners for a cleaner look
                    }}
                  >
                    {item.answer.agentResponse && (
                      <Typography
                        variant="body1"
                        style={{ marginBottom: "10px" }}
                      >
                        {/* <strong>Agent Response:</strong>{" "} */}
                        {item.answer.agentResponse}
                      </Typography>
                    )}

                    {item.answer.sqlquery && (
                      <Typography
                        sx={{ color: "#0096FF", fontWeight: "700" }}
                        variant="body1"
                      >
                        <strong style={{ color: "black" }}>SQL Query : </strong>
                        {item.answer.sqlquery}
                      </Typography>
                    )}

                    {/* {item.answer ? (
                    Array.isArray(item.answer.result) ? ( // Check if `item.answer.result` is an array
                      <>
                        <div
                          style={{
                            display: "flex", // This ensures the table and download icon are in a row
                            flexDirection: "row", // Align in a row
                            alignItems: "center", // Align vertically centered
                            marginTop: "20px",
                          }}
                        >
                          <TableContainer
                            component={Paper}
                            style={{
                              flex: 1, // Table takes up remaining space
                              maxWidth: "800px",
                              border: "0.5px solid #ccc",
                              marginBottom: "20px",
                              boxShadow: "none",
                            }}
                          >
                            <Table
                              size="small"
                              style={{
                                borderCollapse: "collapse",
                                width: "100%",
                              }}
                            >
                              <TableHead>
                                <TableRow
                                  style={{
                                    backgroundColor: "#f0f0f0", // Gray color for the header
                                  }}
                                >
                                  {Object.keys(item.answer.result[0]).map(
                                    (key) => (
                                      <TableCell
                                        key={key}
                                        style={{
                                          border: "1px solid #ddd",
                                          fontWeight: "bold",
                                          textAlign: "center",
                                        }}
                                      >
                                        {key}
                                      </TableCell>
                                    )
                                  )}
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {item.answer.result.map((row, index) => (
                                  <TableRow key={index}>
                                    {Object.values(row).map((value, idx) => (
                                      <TableCell
                                        key={idx}
                                        style={{
                                          border: "1px solid #ddd",
                                          textAlign: "center",
                                        }}
                                      >
                                        {value}
                                      </TableCell>
                                    ))}
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>

                          <IconButton
                            color="primary"
                            style={{
                              marginLeft: "16px", // Space between table and icon
                              marginTop: "16px",
                              backgroundColor: "transparent",
                              boxShadow: "none",
                            }}
                            onClick={() => handleDownload(item.answer.result)} // Pass `item.answer.result` for download
                          >
                            <FileDownloadOutlinedIcon />
                          </IconButton>
                        </div>
                      </>
                    ) : (
                      <Typography pt={3} textAlign="left" variant="body1">
                        {item.answer.result}{" "}
                      </Typography>
                    )
                  ) : null} */}
                    {item.answer ? (
                      // Check if item.answer.result is an array and has data
                      Array.isArray(item.answer.result) &&
                      item.answer.result.length > 0 ? (
                        <>
                          <div
                            style={{
                              display: "flex", // This ensures the table and download icon are in a row
                              flexDirection: "row", // Align in a row
                              // alignItems: "center", // Align vertically centered
                              marginTop: "20px",
                            }}
                          >
                            <TableContainer
                              component={Paper}
                              style={{
                                flex: 1, // Table takes up remaining space
                                maxWidth: "800px",
                                border: "0.5px solid #ccc",
                                marginBottom: "20px",
                                boxShadow: "none",
                              }}
                            >
                              <Table
                                size="small"
                                style={{
                                  borderCollapse: "collapse",
                                  width: "100%",
                                }}
                              >
                                <TableHead>
                                  <TableRow
                                    style={{
                                      backgroundColor: "#f0f0f0", // Gray color for the header
                                    }}
                                  >
                                    {Object.keys(item.answer.result[0]).map(
                                      (key) => (
                                        <TableCell
                                          key={key}
                                          style={{
                                            border: "1px solid #ddd",
                                            fontWeight: "bold",
                                            textAlign: "center",
                                          }}
                                        >
                                          {key}
                                        </TableCell>
                                      )
                                    )}
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {item.answer.result.map((row, index) => (
                                    <TableRow key={index}>
                                      {Object.values(row).map((value, idx) => (
                                        <TableCell
                                          key={idx}
                                          style={{
                                            border: "1px solid #ddd",
                                            textAlign: "center",
                                          }}
                                        >
                                          {value}
                                        </TableCell>
                                      ))}
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </TableContainer>

                            {/* Download Icon next to the table */}
                            <IconButton
                              color="primary"
                              style={{
                                // marginLeft: "16px", // Space between table and icon
                                marginTop: "16px",
                                backgroundColor: "transparent",
                                boxShadow: "none",
                              }}
                              onClick={() => handleDownload(item.answer.result)} // Pass `item.answer.result` for download
                            >
                              <FileDownloadOutlinedIcon />
                            </IconButton>
                          </div>
                        </>
                      ) : (
                        // If item.answer.result is not an array or is empty, show the text
                        <Typography pt={3} textAlign="left" variant="body1">
                          {item.answer.result}{" "}
                          {/* This will display the agent response or query when `result` is not an array */}
                        </Typography>
                      )
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          );
        })}
        {loading && (
          <div style={{ paddingLeft: "50px", display: "flex" }}>
            <CircularProgress size={20} />
          </div>
        )}
      </div>

      // <div
      //   style={{
      //     width: "100%",
      //     height: "100vh",
      //     overflow: "auto",
      //   }}
      //   ref={chatContainerRef}
      // >
      //   {data.map((item, index) => (
      //     <div key={index} style={{ marginBottom: "20px" }}>
      //       {/* User's Query */}
      //       <div
      //         style={{
      //           display: "flex",
      //           justifyContent: "flex-end",
      //           marginBottom: "10px",
      //           paddingRight: "50px",
      //         }}
      //       >
      //         <Typography
      //           variant="body1"
      //           style={{
      //             backgroundColor: "#e0e0e0",
      //             padding: "10px",
      //             borderRadius: "5px",
      //           }}
      //         >
      //           {item.query}
      //         </Typography>
      //       </div>

      //       {/* Response */}
      //       {item.answer && (
      //         <div style={{ paddingLeft: "50px" }}>
      //           <Typography variant="body1" style={{ marginBottom: "10px" }}>
      //             <strong>Agent Response:</strong> {item.answer.agentResponse}
      //           </Typography>
      //           <Typography variant="body1" style={{ marginBottom: "10px" }}>
      //             <strong>SQL Query:</strong> {item.answer.sqlquery}
      //           </Typography>

      //           {/* Result Table */}
      //           <TableContainer
      //             component={Paper}
      //             style={{
      //               marginTop: "20px",
      //               width: "90%",
      //               maxWidth: "800px",
      //               border: "1px solid #ccc",
      //               marginBottom: "20px",
      //               boxShadow: "none",
      //             }}
      //           >
      //             <Table>
      //               <TableHead>
      //                 <TableRow>
      //                   {Object.keys(item.answer.result[0]).map((key) => (
      //                     <TableCell key={key} style={{ fontWeight: "bold" }}>
      //                       {key}
      //                     </TableCell>
      //                   ))}
      //                 </TableRow>
      //               </TableHead>
      //               <TableBody>
      //                 {item.answer.result.map((row, idx) => (
      //                   <TableRow key={idx}>
      //                     {Object.values(row).map((value, idy) => (
      //                       <TableCell key={idy}>{value}</TableCell>
      //                     ))}
      //                   </TableRow>
      //                 ))}
      //               </TableBody>
      //             </Table>
      //           </TableContainer>

      //           <IconButton
      //             color="primary"
      //             onClick={() => handleDownload(item.answer.result)}
      //           >
      //             <FileDownloadOutlinedIcon />
      //           </IconButton>
      //         </div>
      //       )}
      //     </div>
      //   ))}

      //   {loading && (
      //     <div style={{ paddingLeft: "50px", display: "flex" }}>
      //       <CircularProgress size={20} />
      //     </div>
      //   )}
      // </div>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "end", // on condition
        alignItems: "center",
        height: "87vh",
        //maxWidth: "1200px",
        margin: "0 auto",
        //padding: "20px",
        backgroundColor: "#ffff",
        // marginBottom: "20px",
      }}
    >
      {data?.length ? (
        renderChat() //  <h1>hii</h1> //
      ) : (
        <Typography
          variant="h5"
          style={{
            // marginTop: "80px",
            marginBottom: "20px",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "2rem",
          }}
        >
          How can I assist you?
        </Typography>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "90%",
          maxWidth: "600px",
          marginBottom: "40px",
        }}
      >
        <TextField
          value={userInput}
          onChange={handleInputChange}
          placeholder="Type message"
          fullWidth
          variant="outlined"
          multiline
          rows={3}
          onKeyDown={handleKeyPress}
          style={{
            backgroundColor: "#F7F9FB",
            borderRadius: "16px",
          }}
          InputProps={{
            style: { borderRadius: "16px" },
            endAdornment: (
              <>
                <SendIcon
                  onClick={handleSubmit}
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    right: "10px",
                    bottom: "15px",
                    fontSize: "20px",
                  }}
                />
                <MicNoneIcon
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    left: "10px",
                    bottom: "15px",
                    fontSize: "20px",
                  }}
                />
                <PhotoSizeSelectActualOutlinedIcon
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    left: "40px",
                    bottom: "15px",
                    fontSize: "20px",
                  }}
                />
              </>
            ),
          }}
        />
      </div>

      {showCards && !data.length && (
        <Grid
          container
          spacing={2}
          pb={5}
          style={{
            width: "100%",
            maxWidth: "800px",
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            justifyContent: "center",
          }}
        >
          {[
            "How many total interactions are there?",
            "How many unique customers are there?",
            "What is the total number of interactions for each product?",
            "Which organization has the highest number of interactions?",
            "What is the average CSAT score for each organization?",
            "How many interactions occurred through each channel?",
            "What is the average CES score for each product?",
            "What are the most common customer intents?",
            "What is the distribution of customer final tones?",
          ].map((text, index) => (
            <Card
              key={index}
              style={{
                cursor: "pointer",
                backgroundColor: "#F7F9FB",
                borderRadius: "8px",
                boxShadow: "none",
                padding: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "50px",
                width: "200px",
              }}
              onClick={() => setUserInput(text)}
            >
              <CardContent>
                <Typography
                  variant="body2"
                  align="center"
                  style={{ fontSize: "12px" }}
                >
                  {text}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default AssistantAI;
