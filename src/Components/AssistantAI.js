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

  const handleSubmit = async () => {
    if (userInput.trim()) {
      setUserInput("");
      setLoading(true);
      setShowTable(false);
      setShowCards(false);

      const dummyData = [
        {
          Product: "Product A",
          Interactions: 120,
          Customers: 30,
          Channel: "Email",
        },
        {
          Product: "Product B",
          Interactions: 150,
          Customers: 45,
          Channel: "Phone",
        },
        {
          Product: "Product C",
          Interactions: 80,
          Customers: 20,
          Channel: "Chat",
        },
        {
          Product: "Product D",
          Interactions: 200,
          Customers: 60,
          Channel: "Email",
        },
        {
          Product: "Product E",
          Interactions: 90,
          Customers: 25,
          Channel: "Phone",
        },
      ];
      setData((prev) => [...prev, { question: userInput, answer: "" }]);

      setTimeout(() => {
        setTableData(dummyData);

        setShowTable(true);
        setData((prev) => {
          const updatedData = [...prev];
          updatedData[updatedData.length - 1].answer = dummyData; // Update the last entry's answer
          return updatedData;
        });
        setLoading(false);
      }, 1500);
    }
  };

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
              <div
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
              </div>

              {/* Answer on the left */}
              {/* {loading ? (
                <CircularProgress size={40} />
              ) : (
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
                  {Array.isArray(item?.answer) ? ( // for string text we need to add false condition
                    <>
                      <TableContainer
                        component={Paper}
                        style={{
                          marginTop: "20px",
                          width: "90%",
                          maxWidth: "800px",
                          border: "0.5px solid #ccc",
                          marginBottom: "20px",
                          boxShadow: "none",
                        }}
                      >
                        <Table
                          size="small"
                          style={{ borderCollapse: "collapse", width: "100%" }}
                        >
                          <TableHead>
                            <TableRow
                              style={{
                                backgroundColor: "#f0f0f0", // Gray color for the header
                              }}
                            >
                              {Object.keys(item.answer[0]).map((key) => (
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
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {item.answer.map((row, index) => (
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
                          marginLeft: "8px",
                          marginTop: "16px",
                          backgroundColor: "transparent",
                          boxShadow: "none",
                        }}
                        onClick={() => handleDownload(item.answer)}
                      >
                        <FileDownloadOutlinedIcon />
                      </IconButton>
                    </>
                  ) : (
                    <Typography pt={3} textAlign="left" variant="body1">
                      {item.answer}
                    </Typography>
                  )}
                </div>
              )} */}

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
                {item?.answer ? (
                  Array.isArray(item.answer) ? (
                    <>
                      <TableContainer
                        component={Paper}
                        style={{
                          marginTop: "20px",
                          width: "90%",
                          maxWidth: "800px",
                          border: "0.5px solid #ccc",
                          marginBottom: "20px",
                          boxShadow: "none",
                        }}
                      >
                        <Table
                          size="small"
                          style={{ borderCollapse: "collapse", width: "100%" }}
                        >
                          <TableHead>
                            <TableRow
                              style={{
                                backgroundColor: "#f0f0f0", // Gray color for the header
                              }}
                            >
                              {Object.keys(item.answer[0]).map((key) => (
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
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {item.answer.map((row, index) => (
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
                          marginLeft: "8px",
                          marginTop: "16px",
                          backgroundColor: "transparent",
                          boxShadow: "none",
                        }}
                        onClick={() => handleDownload(item.answer)}
                      >
                        <FileDownloadOutlinedIcon />
                      </IconButton>
                    </>
                  ) : (
                    <Typography pt={3} textAlign="left" variant="body1">
                      {item.answer}
                    </Typography>
                  )
                ) : null}
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
