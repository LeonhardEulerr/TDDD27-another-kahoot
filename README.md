# Midcourse screencast

[`Link to midcourse screencast`](https://liuonline-my.sharepoint.com/:v:/g/personal/dawab699_student_liu_se/EQhrtOhanb5GlVOWbewelm0BRGEQzM_KrAvW9OlYMn2IIQ?e=XmXxev)

# Functional specification

Another kahoot is a web application quite similar to well known kahoot. It lets somebody to set up a quiz and let multiple people to participate in the quiz at the same time.

So the two main pillars of this web applications are the host and the participants. The host is responsible for creating and hosting a quiz. Every host host can invite as many participants as it wants. The main difference between my Another Kahoot web application and the original Kahoot is that every participants will also see a questions and their possible answers on on their own screens. For each question there is alimited time for answer. After every question all the participants will see current highscore list distribution of all the answers to a current question on the host's screen. Participants with the highest score wins the quiz.

# Technical specification

I wil be using a classic MERN stack.

- Backend: Node.js with Express.js
- Database: MongoDB
- Frontend: React with Hooks and Context API for "global" communication between components

Additionally I will be using SocketIO for communication between each participants and the server.
