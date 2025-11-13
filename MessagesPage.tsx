import { useState } from 'react';
import { Send, Video, Phone, MoreVertical, Search } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';

interface MessagesPageProps {
  currentUser: any;
}

export function MessagesPage({ currentUser }: MessagesPageProps) {
  const [selectedChat, setSelectedChat] = useState('1');
  const [newMessage, setNewMessage] = useState('');

  const chats = [
    {
      id: '1',
      user: {
        name: 'Chinwe Adebayo',
        avatar: 'https://images.unsplash.com/photo-1573496358961-3c82861ab8f4?w=400&h=400&fit=crop',
        online: true,
      },
      lastMessage: 'Thanks for the great session! See you next week.',
      timestamp: '2:30 PM',
      unread: 2,
    },
    {
      id: '2',
      user: {
        name: 'Kwame Mensah',
        avatar: 'https://images.unsplash.com/photo-1656313826909-1f89d1702a81?w=400&h=400&fit=crop',
        online: false,
      },
      lastMessage: 'Can we reschedule to Thursday?',
      timestamp: 'Yesterday',
      unread: 0,
    },
    {
      id: '3',
      user: {
        name: 'Zainab Kamara',
        avatar: 'https://images.unsplash.com/photo-1638727295415-286409421143?w=400&h=400&fit=crop',
        online: true,
      },
      lastMessage: 'I uploaded the study materials',
      timestamp: '10/20',
      unread: 0,
    },
  ];

  const messages = [
    {
      id: '1',
      sender: 'other',
      text: 'Hi! Ready for our session tomorrow?',
      timestamp: '2:15 PM',
    },
    {
      id: '2',
      sender: 'me',
      text: 'Yes! I reviewed the chapters you recommended.',
      timestamp: '2:20 PM',
    },
    {
      id: '3',
      sender: 'other',
      text: 'Great! Do you have any specific questions?',
      timestamp: '2:25 PM',
    },
    {
      id: '4',
      sender: 'me',
      text: 'I\'m struggling with dynamic programming concepts',
      timestamp: '2:28 PM',
    },
    {
      id: '5',
      sender: 'other',
      text: 'Thanks for the great session! See you next week.',
      timestamp: '2:30 PM',
    },
  ];

  const currentChat = chats.find((chat) => chat.id === selectedChat);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message
      setNewMessage('');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <Card className="h-[calc(100vh-12rem)] flex overflow-hidden">
          {/* Sidebar - Chat List */}
          <div className="w-80 border-r">
            <CardHeader className="border-b">
              <h3>Messages</h3>
              <div className="relative mt-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search conversations..." className="pl-10" />
              </div>
            </CardHeader>
            <ScrollArea className="h-[calc(100%-8rem)]">
              <div className="p-2">
                {chats.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => setSelectedChat(chat.id)}
                    className={`w-full p-3 rounded-lg mb-1 text-left transition-colors ${
                      selectedChat === chat.id
                        ? 'bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200'
                        : 'hover:bg-accent'
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={chat.user.avatar} alt={chat.user.name} />
                          <AvatarFallback>{chat.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {chat.user.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="truncate">{chat.user.name}</span>
                          <span className="text-muted-foreground">{chat.timestamp}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-muted-foreground truncate">{chat.lastMessage}</p>
                          {chat.unread > 0 && (
                            <span className="ml-2 px-2 py-0.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-full">
                              {chat.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col">
            {currentChat && (
              <>
                {/* Chat Header */}
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={currentChat.user.avatar} alt={currentChat.user.name} />
                        <AvatarFallback>{currentChat.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3>{currentChat.user.name}</h3>
                        <p className="text-muted-foreground">
                          {currentChat.user.online ? 'Online' : 'Offline'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="icon" variant="ghost">
                        <Phone className="w-5 h-5" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <Video className="w-5 h-5" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <MoreVertical className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg px-4 py-2 ${
                            message.sender === 'me'
                              ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white'
                              : 'bg-accent'
                          }`}
                        >
                          <p>{message.text}</p>
                          <p
                            className={`mt-1 ${
                              message.sender === 'me' ? 'text-violet-100' : 'text-muted-foreground'
                            }`}
                          >
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <CardContent className="border-t p-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button
                      className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
                      onClick={handleSendMessage}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
