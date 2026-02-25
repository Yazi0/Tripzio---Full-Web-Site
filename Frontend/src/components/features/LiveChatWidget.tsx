import React, { useState, useEffect, useRef } from 'react';
import { X, Send, MessageCircle, Minimize2, MoreVertical } from 'lucide-react';
import { Button } from '../ui/Button';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'agent';
    timestamp: Date;
}

interface LiveChatWidgetProps {
    isOpen: boolean;
    onClose: () => void;
}

export const LiveChatWidget = ({ isOpen, onClose }: LiveChatWidgetProps) => {
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', text: 'Hello! Welcome to Tripzio Support. How can I help you today?', sender: 'agent', timestamp: new Date() }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const newUserMessage: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newUserMessage]);
        setInputValue('');
        setIsTyping(true);

        // Simulate agent response
        setTimeout(() => {
            const responses = [
                "I understand. Let me check that for you.",
                " could you provide your booking reference ID?",
                "Thanks for reaching out. One of our agents will be with you shortly.",
                "That's a great choice! Sri Lanka is beautiful this time of year.",
                "Is there anything else I can assist you with?"
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];

            const newAgentMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: randomResponse,
                sender: 'agent',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, newAgentMessage]);
            setIsTyping(false);
        }, 2000);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-6rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50 overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
            {/* Header */}
            <div className="bg-primary-600 p-4 flex justify-between items-center text-white">
                <div className="flex items-center space-x-3">
                    <div className="relative">
                        <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center">
                            <MessageCircle className="h-6 w-6 text-white" />
                        </div>
                        <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-400 border-2 border-primary-600 rounded-full"></span>
                    </div>
                    <div>
                        <h3 className="font-bold text-sm">Tripzio Support</h3>
                        <p className="text-xs text-primary-100 flex items-center">
                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5 animate-pulse"></span>
                            Online
                        </p>
                    </div>
                </div>
                <div className="flex items-center space-x-1">
                    <button className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
                        <Minimize2 className="h-4 w-4" />
                    </button>
                    <button onClick={onClose} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
                        <X className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                <div className="text-center text-xs text-gray-400 my-4">
                    <span>Today</span>
                </div>

                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        {message.sender === 'agent' && (
                            <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                                <MessageCircle className="h-4 w-4 text-primary-600" />
                            </div>
                        )}
                        <div
                            className={`max-w-[80%] p-3 rounded-2xl text-sm ${message.sender === 'user'
                                ? 'bg-primary-600 text-white rounded-tr-none'
                                : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none shadow-sm'
                                }`}
                        >
                            <p>{message.text}</p>
                            <span className={`text-[10px] block mt-1 ${message.sender === 'user' ? 'text-primary-100' : 'text-gray-400'}`}>
                                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="flex justify-start">
                        <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                            <MessageCircle className="h-4 w-4 text-primary-600" />
                        </div>
                        <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-tl-none shadow-sm">
                            <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100">
                <form onSubmit={handleSendMessage} className="flex space-x-2">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 bg-gray-50 border-transparent focus:border-primary-500 focus:bg-white focus:ring-0 rounded-xl px-4 text-sm transition-all"
                    />
                    <Button
                        type="submit"
                        disabled={!inputValue.trim()}
                        className="rounded-xl w-10 h-10 p-0 flex items-center justify-center"
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </form>
            </div>
        </div>
    );
};
