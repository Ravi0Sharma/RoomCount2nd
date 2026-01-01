# RoomCount 


## **Description**
Introducing the RoomCount app, a smart solution for monitoring room occupancy with ease and accuracy. Designed to simplify counting the number of people entering a room.

Using sensors and user-friendly webiste, RoomCount provides instant updates on entry counts. Users can start a session, which is stored in RoomCount's database. They can also set a maximum number of people allowed to enter, tailored to their specific needs, ensuring spaces remain safe.

The app alerts users when the number of entries exceeds the set threshold, helping to prevent overcrowding and maintain a comfortable environment.


## **RoomCount Milestones Overview**

The following is a structured list of requirements, including Functional Requirements (FR), Non-Functional Requirements (NFR), and User Stories, organized by milestones.

### [**Milestone 1**](https://git.chalmers.se/ravisha/RoomCount2nd/-/milestones/1#tab-issues) - Core Functionality and Basic Web Interface

**Functional Requirements (FR):**

#10 **FR 1:** The system shall receive data from the GROVE ultrasonic ranger

* Set the appropriate pin modes and read data from the sensor.
* Filter out irrelevant readings to ensure accurate data collection.

#10 **FR 2:** The system shall process the data to count entries

* Detect and count each person entering the room based on the processed data.

#2 #3 #4 #5 **FR 3:** The system shall provide a database for storing and managing data

* Create collections for storing user credentials and session data.
* Store session information, including total entry counts allowed.

#2 #6 #7 **FR 4:** The system shall have Sign-Up and Login Functionality

* Create user models and controllers to handle login and registration.
* Create a registration page for users to sign up with their name and password.
* Create a login page for users to log in with their credentials.

#8 **FR 5:** The system shall have a website dashboard

* The dashboard shall display the total number of people who have entered the room.
* The dashboard shall have a section to display the number of people that entered the room. 
* The dashboard shall have a button to create a new session.
* The dashboard shall have a button to start and end sessions.

**Non-Functional Requirements (NFR):**

#10 **NFR 1:** The system shall display entry counts accurately.

#6 #7 #8 #9 **NFR 2:** The website UI shall be responsive and user-friendly.

**User stories:**

1.1. As a user, I want to see the number of people that has entered a room on the WIO terminal. 

1.2. As a user, I want accurate registration of people entering the room.

1.3 As a user user I want the session information to be stored so i can view it later. 

### [**Milestone 2**](https://git.chalmers.se/ravisha/RoomCount2nd/-/milestones/2#tab-issues) - Connectivity and Session

**Functional Requirements (FR):**

#12 **FR 6:** The system shall allow the user to see the status of the Wi-Fi connectivity on the Wio terminal

* Implement a mechanism to continuously monitor the Wi-Fi connection.
* Provide feedback to the user on the connection status of the WiFi.

#12 **FR 7:** The system shall allow users to see the status of MQTT broker connectivity on the Wio terminal

* implement a mechanism to continuously monitor the MQTT connection.
* Provide feedback to the user on the connection status of the MQTT.

#12 **FR 9:** The system shall monitor Wi-Fi connectivity

* Continuously check the Wi-Fi broker connection status.
* Notify users of Wi-F connectivity issues.

#12 **FR 10:** The system shall monitor MQTT broker connectivity

* Continuously check the MQTT broker connection status.
* Notify users of MQTT connectivity issues.

#17 **FR 11:** The system shall be able to create session on the website

* The system shall allow users to create new sessions via a button on the website.

#16 **FR 12:** The system shall have a session page.

* Allow users to view historical session data through the web interface.

**Non-Functional Requirements (NFR):**

#12 **NFR 3:** The system shall clearly inform the user of potential Wi-Fi connectivity issues.

* The system shall display a message on the WIO Terminal to display text informing users about potential Wi-Fi connectivity issues and solutions.

#12 **NFR 4:**  The system shall clearly inform the user of potential MQTT broker connectivity issues.

* The system shall display a message on the WIO Terminal to display text informing 
* users about potential MQTT connectivity issues and solutions.

#16 **NFR 5:** The system shall clearly display historical session data in an organized format.

**User stories:**

2.1. As a user, I want to be informed about Wi-Fi and MQTT connectivity status on the Wio Terminal and notified in case of disconnection.

2.2. As a user, I want the system to notify me if there are any  Wi-Fi and MQT connectivity issues, so that I can take action to resolve them.

2.3. As a user, I want to view historical session data on the web interface, so that I can review past entries and better manage future sessions.


### [**Milestone 3**](https://git.chalmers.se/ravisha/RoomCount2nd/-/milestones/3#tab-issues) - Refinement and Alerts

**Functional Requirements (FR):**

#19 #26 **FR 11:** The system shall allow users to set a maximum entry limit

* Provide an interface on the website for users to configure the maximum number of entries allowed per session.
* Store the limit in the database.

#25 #26 **FR 12:** The system shall alert users when the entry limit is exceeded

* Trigger a visual light and audio sound alert when the limit is reached.
* Display an alert on the web dashboard notifying the user.

**Non-Functional Requirements (NFR):**

#9 **NFR 4:** The system shall ensure all features are easy to navigate and use.

**User stories:**

3.1. As a user, I want to set a maximum entry limit so that I can control room capacity for each session.

3.2. As a user, I want to be alerted when the entry limit is reached so that I can manage overcrowding.

3.3. As a user, I want the web dashboard to display a message when the entry limit is exceeded so that I can monitor the situation remotely≤


## **System Components**

| Sensors |
|---------|
| Grove - [Ultrasonic Ranger](https://wiki.seeedstudio.com/Grove-Ultrasonic_Ranger/) |


## **System Design**
![Screenshot_2025-01-05_at_17.51.37](uploads/b3ddd7b7bef4aea11e1955f5ed7c32d3/Screenshot_2025-01-05_at_17.51.37.png)
