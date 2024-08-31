'use client'

import React, { useState, useEffect, useRef } from 'react';
import { Message as MessageIcon, Send as SendIcon, Image as ImageIcon, Mic as MicIcon } from '@mui/icons-material';
import { 
  Button, Dialog, DialogContent, DialogTitle, IconButton, 
  TextField, Typography, Paper, Box, Fab, ThemeProvider, createTheme
} from '@mui/material';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Create a dark theme with gradient background
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3f51b5',
    },
    background: {
      default: '#121212',
      paper: 'rgba(30, 30, 30, 0.8)',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function MessagingModal({ isOpen, onClose }) {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const chatContainerRef = useRef(null);

    const genAI = new GoogleGenerativeAI("AIzaSyBLL8MMqLP7xH_ub47hFyUExUSc8rOCk80");
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const suggestions = [
        "Write a product description for a new type of toothbrush",
        "Look up a Linux shell command for a specific task",
        "Recommend new types of water sports, including pros & cons",
        "Come up with a complex word riddle, including hints"
    ];

    useEffect(() => {
        if (isOpen) {
            setMessage('');
        }
    }, [isOpen]);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const sendMessage = async (messageToSend) => {
        if (!messageToSend.trim()) return;

        setIsLoading(true);
        const userMessage = { type: 'user', content: messageToSend };
        setChatHistory(prev => [...prev, userMessage]);
        setMessage('');

        try {
            const chat = model.startChat({
                history: chatHistory.map(msg => ({
                    role: msg.type === 'user' ? 'user' : 'model',
                    parts: [{ text: msg.content }]
                })),
                generationConfig: {
                    maxOutputTokens: 500,
                },
            });

            const result = await chat.sendMessage(messageToSend);
            const response = await result.response;
            const text = await response.text();
            
            const botMessage = { type: 'bot', content: text };
            setChatHistory(prev => [...prev, botMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage = { type: 'bot', content: 'Sorry, I encountered an error. Please try again.' };
            setChatHistory(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendMessage = () => {
        sendMessage(message);
    };

    const handleSuggestionClick = (suggestion) => {
        sendMessage(suggestion);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <Dialog 
            open={isOpen} 
            onClose={onClose}
            fullWidth
            maxWidth="md"
            PaperProps={{
                style: { 
                    background: 'linear-gradient(45deg, #0f0c29, #302b63, #24243e)',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                }
            }}
        >
            <DialogTitle>
                <Typography 
                    variant="h4" 
                    style={{ 
                        background: 'linear-gradient(to right, #2196F3, #E91E63)', 
                        WebkitBackgroundClip: 'text', 
                        WebkitTextFillColor: 'transparent',
                        display: 'inline-block',
                        fontWeight: '600'
                    }}
                >
                    Hello,
                </Typography>
                <Typography variant="subtitle1" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>How can I help you today?</Typography>
            </DialogTitle>
            <DialogContent>
                <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
                    {suggestions.map((suggestion, index) => (
                        <Button 
                            key={index} 
                            variant="outlined" 
                            size="small"
                            onClick={() => handleSuggestionClick(suggestion)}
                            style={{ 
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                color: 'rgba(255, 255, 255, 0.9)',
                                borderColor: 'rgba(255, 255, 255, 0.2)',
                                marginBottom: '8px',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                }
                            }}
                        >
                            {suggestion}
                        </Button>
                    ))}
                </Box>
                
                <Paper 
                    ref={chatContainerRef} 
                    elevation={3} 
                    style={{ 
                        height: '400px', 
                        overflowY: 'auto', 
                        padding: '16px', 
                        marginBottom: '16px', 
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    {chatHistory.map((msg, index) => (
                        <Box 
                            key={index} 
                            display="flex" 
                            justifyContent={msg.type === 'user' ? 'flex-end' : 'flex-start'}
                            mb={2}
                        >
                            <Paper 
                                elevation={1} 
                                style={{ 
                                    padding: '8px 16px', 
                                    maxWidth: '70%',
                                    backgroundColor: msg.type === 'user' ? 'rgba(63, 81, 181, 0.7)' : 'rgba(255, 255, 255, 0.1)',
                                    color: 'white'
                                }}
                            >
                                <Typography>{msg.content}</Typography>
                            </Paper>
                        </Box>
                    ))}
                </Paper>
                <Box display="flex" alignItems="center">
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Enter a prompt here"
                        value={message}
                        onChange={handleMessageChange}
                        onKeyPress={handleKeyPress}
                        InputProps={{
                            style: { 
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                borderRadius: '24px',
                                padding: '8px 16px',
                                color: 'white',
                            },
                            endAdornment: (
                                <>
                                    <IconButton color="primary">
                                        <ImageIcon />
                                    </IconButton>
                                    <IconButton color="primary">
                                        <MicIcon />
                                    </IconButton>
                                    <IconButton 
                                        onClick={handleSendMessage} 
                                        disabled={isLoading}
                                        color="primary"
                                    >
                                        <SendIcon />
                                    </IconButton>
                                </>
                            )
                        }}
                    />
                </Box>
            </DialogContent>
        </Dialog>
    );
}

export default function ChatBot() {
    const [isMessagingModalOpen, setIsMessagingModalOpen] = useState(false);

    const toggleMessagingModal = () => {
        setIsMessagingModalOpen(!isMessagingModalOpen);
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <Fab 
                color="primary" 
                aria-label="chat"
                style={{
                    position: 'fixed',
                    bottom: darkTheme.spacing(4),
                    right: darkTheme.spacing(4),
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                }}
                onClick={toggleMessagingModal}
            >
                <MessageIcon />
            </Fab>
            <MessagingModal isOpen={isMessagingModalOpen} onClose={toggleMessagingModal} />
        </ThemeProvider>
    );
}