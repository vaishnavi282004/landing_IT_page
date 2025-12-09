// No duplication needed for manual scroll
document.addEventListener('DOMContentLoaded', function() {
    // Script ready
});

// Course Type Dropdown Handler
document.getElementById('courseType').addEventListener('change', function() {
    const courseType = this.value;
    
    // Hide all course groups
    document.getElementById('governmentCourseGroup').style.display = 'none';
    document.getElementById('naitCourseGroup').style.display = 'none';
    document.getElementById('upsdcoCourseGroup').style.display = 'none';
    document.getElementById('privateCourseGroup').style.display = 'none';
    document.getElementById('universityCourseGroup').style.display = 'none';
    document.getElementById('roboticsCourseGroup').style.display = 'none';
    document.getElementById('digitalMarketingCourseGroup').style.display = 'none';
    
    // Show relevant course group based on selection
    if (courseType === 'government') {
        document.getElementById('governmentCourseGroup').style.display = 'block';
    } else if (courseType === 'private') {
        document.getElementById('privateCourseGroup').style.display = 'block';
    } else if (courseType === 'university') {
        document.getElementById('universityCourseGroup').style.display = 'block';
    } else if (courseType === 'robotics') {
        document.getElementById('roboticsCourseGroup').style.display = 'block';
    } else if (courseType === 'digital-marketing') {
        document.getElementById('digitalMarketingCourseGroup').style.display = 'block';
    }
});

// Government Institute Dropdown Handler
document.getElementById('governmentInstitute').addEventListener('change', function() {
    const institute = this.value;
    
    // Hide all government course groups
    document.getElementById('naitCourseGroup').style.display = 'none';
    document.getElementById('upsdcoCourseGroup').style.display = 'none';
    
    // Show relevant government course group
    if (institute === 'nait') {
        document.getElementById('naitCourseGroup').style.display = 'block';
    } else if (institute === 'upsdco') {
        document.getElementById('upsdcoCourseGroup').style.display = 'block';
    }
});

// Form Submission Handler
document.getElementById('enquiryForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        qualification: document.getElementById('qualification').value,
        courseType: document.getElementById('courseType').value
    };

    // Add specific course based on course type
    const courseType = document.getElementById('courseType').value;
    if (courseType === 'government') {
        const institute = document.getElementById('governmentInstitute').value;
        formData.institute = institute;
        if (institute === 'nait') {
            formData.course = document.getElementById('naitCourse').value;
        } else if (institute === 'upsdco') {
            formData.course = document.getElementById('upsdcoCourse').value;
        }
    } else if (courseType === 'private') {
        formData.course = document.getElementById('privateCourse').value;
    } else if (courseType === 'university') {
        formData.course = document.getElementById('universityCourse').value;
    } else if (courseType === 'robotics') {
        formData.course = document.getElementById('roboticsCourse').value;
    }

    // Create WhatsApp message
    let message = `*New Enquiry from THE PROFESSIONALS*%0A%0A`;
    message += `*Name:* ${formData.name}%0A`;
    message += `*Phone:* ${formData.phone}%0A`;
    message += `*Email:* ${formData.email}%0A`;
    message += `*Qualification:* ${formData.qualification}%0A`;
    message += `*Course Type:* ${formData.courseType}%0A`;
    
    if (formData.institute) {
        message += `*Institute:* ${formData.institute}%0A`;
    }
    if (formData.course) {
        message += `*Selected Course:* ${formData.course}%0A`;
    }

    // Open WhatsApp with pre-filled message
    const whatsappURL = `https://wa.me/919528031917?text=${message}`;
    window.open(whatsappURL, '_blank');

    // Hide form and show thank you message
    document.getElementById('enquiryForm').style.display = 'none';
    document.getElementById('thankYouMessage').style.display = 'block';

    // Optional: Reset form after 5 seconds and show it again
    setTimeout(function() {
        document.getElementById('enquiryForm').reset();
        document.getElementById('enquiryForm').style.display = 'block';
        document.getElementById('thankYouMessage').style.display = 'none';
        
        // Hide all course groups after reset
        document.getElementById('governmentCourseGroup').style.display = 'none';
        document.getElementById('naitCourseGroup').style.display = 'none';
        document.getElementById('upsdcoCourseGroup').style.display = 'none';
        document.getElementById('privateCourseGroup').style.display = 'none';
        document.getElementById('universityCourseGroup').style.display = 'none';
        document.getElementById('roboticsCourseGroup').style.display = 'none';
    }, 5000);
});

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Phone number validation
document.getElementById('phone').addEventListener('input', function(e) {
    this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10);
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.affiliation-card, .course-level, .social-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Form validation messages
const form = document.getElementById('enquiryForm');
const inputs = form.querySelectorAll('input[required], select[required]');

inputs.forEach(input => {
    input.addEventListener('invalid', function(e) {
        e.preventDefault();
        this.classList.add('error');
    });

    input.addEventListener('input', function() {
        this.classList.remove('error');
    });
});

// Add error styling dynamically
const style = document.createElement('style');
style.textContent = `
    .form-group input.error,
    .form-group select.error {
        border-color: #ef4444 !important;
        animation: shake 0.3s ease;
    }

    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// Toggle Course Lists in About Section
function toggleCourses(category) {
    const courseList = document.getElementById(category + '-courses');
    const button = event.target.closest('.view-courses-btn');
    
    if (courseList.style.display === 'none' || courseList.style.display === '') {
        courseList.style.display = 'block';
        button.classList.add('active');
    } else {
        courseList.style.display = 'none';
        button.classList.remove('active');
    }
}

// Course Details Data
const courseDetails = {
    // NILET Courses
    'nait-bcc': {
        title: 'BCC - Basic Computer Course',
        duration: '80 Hours',
        description: 'Foundation course for beginners to learn basic computer operations and applications.',
        topics: ['Computer Fundamentals', 'MS Office', 'Internet Basics', 'Email Management'],
        link: 'http://nielit.gov.in/sites/default/files/headquarter/pdf/20190531_BCC_Revision.pdf'
    },
    'nait-ccc': {
        title: 'CCC - Course on Computer Concepts',
        duration: '80 Hours',
        description: 'Basic computer literacy program covering fundamentals of computer operations, internet, and office applications.',
        topics: ['Computer Basics', 'MS Office', 'Internet & Email', 'Digital Financial Tools'],
        link: 'http://nielit.gov.in/sites/default/files/headquarter/pdf/20231006_CCC_Revised_Syllabus.pdf'
    },
    'nait-ccc-plus': {
        title: 'CCC Plus - Course on Computer Concepts Plus',
        duration: '120 Hours',
        description: 'Advanced computer concepts including programming basics and advanced office productivity.',
        topics: ['Advanced MS Office', 'Programming Basics', 'Database Management', 'Web Technologies'],
        link: 'https://www.nielit.gov.in/sites/default/files/headquarter/education/pdf/160512_CCCPlus_Details.pdf'
    },
    'nait-o-level': {
        title: 'O Level',
        duration: '1 Year',
        description: 'Foundation level IT course equivalent to a diploma, recognized by NIELIT.',
        topics: ['IT Tools', 'Programming', 'Internet Technologies', 'Web Design', 'Multimedia'],
        link: 'http://nielit.gov.in/sites/default/files/headquarter/pdf/O_Level_Syllabus.pdf'
    },
    
    // UPSDCO Courses
    'upsdco-bcc': {
        title: 'Basic Computer Course (BCC)',
        duration: '3 Months',
        description: 'Foundation course for beginners to learn basic computer operations and applications.',
        topics: ['Computer Fundamentals', 'MS Office', 'Internet Basics', 'Email Management'],
        link: 'https://www.nielit.gov.in/sites/default/files/headquarter/pdf/20190531_BCC_Revision.pdf'
    },
    'upsdco-ccca': {
        title: 'Certificate Course in Computer Application',
        duration: '6 Months',
        description: 'Comprehensive course covering office automation and basic programming.',
        topics: ['Office Automation', 'Database Basics', 'Internet Applications', 'Basic Programming']
    },
    'upsdco-dca': {
        title: 'Diploma in Computer Application',
        duration: '1 Year',
        description: 'Professional course for comprehensive computer application knowledge.',
        topics: ['Advanced MS Office', 'Programming in C/C++', 'Database Management', 'Web Development']
    },
    'upsdco-adca': {
        title: 'Advanced Diploma in Computer Application',
        duration: '18 Months',
        description: 'Advanced professional course for IT professionals.',
        topics: ['Advanced Programming', 'Software Development', 'Networking', 'System Administration']
    },
    'upsdco-tally': {
        title: 'Certificate in Tally with GST',
        duration: '3 Months',
        description: 'Specialized course in Tally accounting software with GST implementation.',
        topics: ['Tally Prime', 'GST Filing', 'Accounting Fundamentals', 'Inventory Management']
    },
    'upsdco-dm': {
        title: 'Certificate in Digital Marketing',
        duration: '4 Months',
        description: 'Complete digital marketing course covering SEO, SMM, and online advertising.',
        topics: ['SEO', 'Social Media Marketing', 'Google Ads', 'Content Marketing', 'Analytics']
    },
    'upsdco-gd': {
        title: 'Certificate in Graphic Designing',
        duration: '6 Months',
        description: 'Professional graphic design course using industry-standard tools.',
        topics: ['Photoshop', 'Illustrator', 'CorelDRAW', 'InDesign', 'Design Principles']
    },
    'upsdco-prog': {
        title: 'Certificate in Programming',
        duration: '6 Months',
        description: 'Learn programming languages including Python, Java, and C++.',
        topics: ['Python Programming', 'Java Fundamentals', 'C++ Basics', 'Data Structures', 'Algorithms']
    },
    'upsdco-web': {
        title: 'Certificate in Web Development',
        duration: '6 Months',
        description: 'Full-stack web development course covering frontend and backend technologies.',
        topics: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'Database Integration']
    },
    'upsdco-da': {
        title: 'Certificate in Data Analytics',
        duration: '6 Months',
        description: 'Data analysis and visualization using modern tools and techniques.',
        topics: ['Excel Analytics', 'Power BI', 'Python for Data', 'Statistics', 'Data Visualization']
    },
    'upsdco-ccc': {
        title: 'Course on Computer Concept (CCC)',
        duration: '80 Hours',
        description: 'Basic computer literacy program covering fundamentals of computer operations.',
        topics: ['Computer Basics', 'MS Office', 'Internet & Email', 'Digital Tools'],
        link: 'https://www.updescoaec.com/course-list/Course-on-Computer-Concept-CCC.pdf'
    },
    'upsdco-dit': {
        title: 'Diploma In Information Technology',
        duration: '1 Year',
        description: 'Comprehensive IT diploma covering programming, networking, and system administration.',
        topics: ['Programming', 'Networking', 'Database Management', 'System Administration'],
        link: 'https://www.updescoaec.com/course-list/Diploma-In-Information-Technology.pdf'
    },
    'upsdco-cca': {
        title: 'Certificate in Computer Application (CCA)',
        duration: '6 Months',
        description: 'Course covering office automation and basic computer applications.',
        topics: ['MS Office', 'Internet Applications', 'Basic Programming', 'Database Basics'],
        link: 'https://www.updescoaec.com/course-list/Certificate-in-Computer-Application-CCA.pdf'
    },
    'upsdco-ccp': {
        title: 'Certificate in Computer Programming (CCP)',
        duration: '6 Months',
        description: 'Learn programming fundamentals and software development.',
        topics: ['C Programming', 'Data Structures', 'Algorithms', 'Software Development'],
        link: 'https://www.updescoaec.com/course-list/Certificate-in-Computer-Programming-CCP.pdf'
    },
    'upsdco-cis': {
        title: 'Certificate in Information System (CIS)',
        duration: '6 Months',
        description: 'Information systems management and database technologies.',
        topics: ['Database Design', 'System Analysis', 'Information Management', 'SQL'],
        link: 'https://www.updescoaec.com/course-list/Certificate-in-Information-System-CIS.pdf'
    },
    'upsdco-cit': {
        title: 'Certificate in Information Technology (CIT)',
        duration: '6 Months',
        description: 'Comprehensive IT course covering hardware, software, and networking.',
        topics: ['Hardware', 'Software', 'Networking', 'Internet Technologies'],
        link: 'https://www.updescoaec.com/course-list/Certificate-in-Information-Technology-CIT.pdf'
    },
    'upsdco-java': {
        title: 'Java Programming',
        duration: '4 Months',
        description: 'Complete Java programming from basics to advanced concepts.',
        topics: ['Java Basics', 'OOP', 'Collections', 'JDBC', 'Servlets'],
        link: 'https://www.updescoaec.com/course-list/Java-Programming.pdf'
    },
    'upsdco-oracle': {
        title: 'Oracle 8i Developer 2000 VB',
        duration: '6 Months',
        description: 'Oracle database development with Visual Basic integration.',
        topics: ['Oracle 8i', 'PL/SQL', 'Visual Basic', 'Forms & Reports', 'Database Design'],
        link: 'https://www.updescoaec.com/course-list/Oracle-8i-Developer-2000-VB.pdf'
    },
    'upsdco-webdev': {
        title: 'Web Application Development',
        duration: '6 Months',
        description: 'Full-stack web development course covering modern web technologies.',
        topics: ['HTML/CSS', 'JavaScript', 'PHP', 'MySQL', 'Web Frameworks'],
        link: 'https://www.updescoaec.com/course-list/Web-Application-Development.pdf'
    },
    'upsdco-vbaccess': {
        title: 'VB with Access Microsoft',
        duration: '4 Months',
        description: 'Visual Basic programming with Microsoft Access database.',
        topics: ['Visual Basic', 'MS Access', 'Database Programming', 'Forms Design', 'Queries'],
        link: 'https://www.updescoaec.com/course-list/VB-with-Access-Microsoft.pdf'
    },
    'upsdco-oops': {
        title: 'OOPS and C++',
        duration: '5 Months',
        description: 'Object-oriented programming concepts using C++.',
        topics: ['OOP Concepts', 'C++ Programming', 'Classes & Objects', 'Inheritance', 'Polymorphism'],
        link: 'https://www.updescoaec.com/course-list/OOPS-and-C++.pdf'
    },
    'upsdco-cplusdev': {
        title: 'Application Development using C++',
        duration: '6 Months',
        description: 'Advanced C++ for application development.',
        topics: ['Advanced C++', 'STL', 'Templates', 'Application Design', 'Project Development'],
        link: 'https://www.updescoaec.com/course-list/Application-Development-using-C++.pdf'
    },
    'upsdco-vbsql': {
        title: 'VB with SQL Server application Development',
        duration: '6 Months',
        description: 'Visual Basic programming with SQL Server database.',
        topics: ['Visual Basic', 'SQL Server', 'ADO.NET', 'Stored Procedures', 'Application Development'],
        link: 'https://www.updescoaec.com/course-list/VB-with-SQL-Server-application-Development.pdf'
    },
    'upsdco-linux': {
        title: 'Linux Unix',
        duration: '4 Months',
        description: 'Linux/Unix system administration and shell programming.',
        topics: ['Linux Basics', 'Shell Scripting', 'System Administration', 'Networking', 'Security'],
        link: 'https://www.updescoaec.com/course-list/Linux-Unix.pdf'
    },
    'upsdco-network': {
        title: 'Network Technology',
        duration: '5 Months',
        description: 'Computer networking fundamentals and advanced concepts.',
        topics: ['Networking Basics', 'TCP/IP', 'Routing & Switching', 'Network Security', 'LAN/WAN'],
        link: 'https://www.updescoaec.com/course-list/Network-Technology.pdf'
    },
    'upsdco-dtp': {
        title: 'Desk Top Publishing (DTP)',
        duration: '3 Months',
        description: 'Desktop publishing using professional design software.',
        topics: ['PageMaker', 'CorelDRAW', 'Photoshop', 'InDesign', 'Print Design'],
        link: 'https://www.updescoaec.com/course-list/Desk-Top-Publishing-DTP.pdf'
    },
    'upsdco-autocad': {
        title: 'Computer Aided Designing (Auto CAD)',
        duration: '4 Months',
        description: 'AutoCAD for 2D and 3D design and drafting.',
        topics: ['2D Drafting', '3D Modeling', 'Technical Drawing', 'Architectural Design', 'Project Work'],
        link: 'https://www.updescoaec.com/course-list/Computer-Aided-Designing-Auto-CAD.pdf'
    },
    'upsdco-office': {
        title: 'Certificate in office Automation',
        duration: '3 Months',
        description: 'Complete MS Office suite and office productivity tools.',
        topics: ['MS Word', 'MS Excel', 'MS PowerPoint', 'MS Access', 'Office Tools'],
        link: 'https://www.updescoaec.com/course-list/Cerificate-in-office-Automation.pdf'
    },
    'upsdco-tally': {
        title: 'Certificate in financial accounting (Tally)',
        duration: '3 Months',
        description: 'Tally accounting software with GST and financial management.',
        topics: ['Tally Prime', 'GST', 'Accounting Fundamentals', 'Inventory', 'Financial Reports'],
        link: 'https://www.updescoaec.com/course-list/Certificate-in-finacial-accounting-Tally.pdf'
    },
    'upsdco-webdesign': {
        title: 'Certificate in Web Design',
        duration: '4 Months',
        description: 'Modern web design using HTML, CSS, and JavaScript.',
        topics: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Web Graphics'],
        link: 'https://www.updescoaec.com/course-list/Certificate-in-Web-Design.pdf'
    },
    'upsdco-access': {
        title: 'DB Application development using ACCESS 2000',
        duration: '3 Months',
        description: 'Database application development with Microsoft Access.',
        topics: ['MS Access', 'Database Design', 'Forms & Reports', 'Queries', 'VBA Programming'],
        link: 'https://www.updescoaec.com/course-list/DB-Application-development-using-ACCESS-2000.pdf'
    },
    'upsdco-computer': {
        title: 'Certificate in using Computer',
        duration: '2 Months',
        description: 'Basic computer usage and digital literacy.',
        topics: ['Computer Basics', 'Windows OS', 'Internet Usage', 'Email', 'Basic Applications'],
        link: 'https://www.updescoaec.com/course-list/Certificate-in-using-Computer.pdf'
    },
    'upsdco-c': {
        title: 'Certificate in C Programming',
        duration: '4 Months',
        description: 'C programming language fundamentals and applications.',
        topics: ['C Basics', 'Data Types', 'Control Structures', 'Functions', 'Pointers', 'File Handling'],
        link: 'https://www.updescoaec.com/course-list/Certificate-in-C-Programming.pdf'
    },
    'upsdco-cplus': {
        title: 'Certificate In C++ Programming',
        duration: '4 Months',
        description: 'C++ programming with object-oriented concepts.',
        topics: ['C++ Basics', 'OOP', 'Classes & Objects', 'Inheritance', 'Templates'],
        link: 'https://www.updescoaec.com/course-list/Certificate-In-C++-Programming.pdf'
    },
    'upsdco-web': {
        title: 'Certificate in using Web',
        duration: '2 Months',
        description: 'Internet basics, web browsing, and online services.',
        topics: ['Internet Basics', 'Web Browsing', 'Email', 'Social Media', 'Online Services'],
        link: 'https://www.updescoaec.com/course-list/Certificate-in-using-Web.pdf'
    },
    
    // Private Courses
    'private-level1': {
        title: 'Level 1: Foundation Courses',
        duration: '2-3 Months',
        description: 'Foundation level courses covering essential digital and office skills.',
        topics: [
            'Digital Literacy & Computer Basics: OS Functions, File Management, Internet Browsing, Email Usage, Google Workspace/MS Office Introduction',
            'Advanced MS Excel & MIS Reporting: VLOOKUP, Pivot Tables, Data Sorting/Filtering, Basic Data Entry Techniques, Generating Simple Reports',
            'Introduction to Business Communication: Email Etiquette, Professional Report Writing, Basic Presentation Skills, Meeting Summaries & Minutes'
        ]
    },
    'private-level2': {
        title: 'Level 2: AI Literacy & Productivity',
        duration: '3-4 Months',
        description: 'Learn AI tools, design basics, digital safety, and web development fundamentals.',
        topics: [
            'Generative AI Fundamentals (Gemini/ChatGPT): Prompt Engineering Basics, Idea Brainstorming, Content Summarization, Microsoft Copilot Introduction',
            'Writing, Grammar & Design Tools: QuillBot/Grammarly (Paraphrasing), Canva/Adobe Express (Basic Poster/Graphic Design), Gamma App (AI Presentation)',
            'AI Principles & Digital Safety: What is AI? (Microsoft Module), Responsible AI (Ethics), Basics of Cybersecurity, YUVA AI for All Program',
            'Web Development Basics (HTML & CSS): Basic Structure of a Web Page, HTML Tags, Styling with CSS (Colors, Fonts, Layout), Creating a simple static page'
        ]
    },
    'private-level3': {
        title: 'Level 3: Market-Ready & Coding Basics',
        duration: '4-6 Months',
        description: 'Develop job-ready skills in data visualization, digital marketing, programming, and databases.',
        topics: [
            'Visual Data Storytelling (Power BI/Tableau): Data Cleaning, Connecting Data Sources, Creating Interactive Charts and Basic Dashboards, Data Interpretation',
            'Digital Marketing Fundamentals (SEO & SMM): Keyword Research, On-Page SEO Basics, Social Media Strategy, Content Creation using AI tools, Web Analytics Basics',
            'Getting Started with Python: Variables, Data Types, Conditional Statements (If/Else), Loops (For/While), Basic Functions, Simple Scripting Logic',
            'SQL & Database Management: Basic SQL Queries (SELECT, INSERT, UPDATE, DELETE), Database Concepts, Joins (INNER, LEFT, RIGHT), Data Integrity'
        ]
    },
    'private-level4': {
        title: 'Level 4: Advanced Skills & Specialization',
        duration: '6-8 Months',
        description: 'Master advanced AI, cloud computing, automation, cybersecurity, and project management.',
        topics: [
            'Generative AI with LLMs & Prompting: LLM Architecture Overview, Advanced Prompting Techniques (Chain-of-Thought, Zero-Shot), Limitations of LLMs, Text/Image Generation',
            'Cloud Computing & Data Science Overview: Cloud Concepts (IaaS, PaaS, SaaS), Introduction to Microsoft Azure AI-900 Core, Fundamentals of Data Analysis, Early-stage Data Science',
            'Advanced Automation & Cybersecurity: Python for Office Automation (File Handling), Cybersecurity Threats & Detection, Introduction to IoT and AI integration in real-world systems',
            'Agile & Project Management (Scrum/Kanban): Project Lifecycle, Agile Methodology Principles, Scrum Roles and Artifacts, Basic Risk Management, Tools like Trello/Jira'
        ]
    },
    
    // University Programs
    'univ-bca': {
        title: 'BCA (Bachelor of Computer Applications)',
        duration: '3 Years',
        description: 'Undergraduate degree program in computer applications.',
        topics: ['Programming', 'Database', 'Web Technologies', 'Software Engineering', 'Project Work']
    },
    'univ-mca': {
        title: 'MCA (Master of Computer Applications)',
        duration: '2 Years',
        description: 'Postgraduate degree program in computer applications.',
        topics: ['Advanced Programming', 'AI/ML', 'Cloud Computing', 'Mobile Development', 'Research']
    },
    'univ-btech': {
        title: 'B.Tech in Computer Science',
        duration: '4 Years',
        description: 'Engineering degree in computer science and technology.',
        topics: ['Engineering Fundamentals', 'Data Structures', 'Algorithms', 'System Design', 'Capstone']
    },
    'univ-mtech': {
        title: 'M.Tech in Computer Science',
        duration: '2 Years',
        description: 'Master\'s degree in computer science engineering.',
        topics: ['Advanced Algorithms', 'AI/ML', 'Research Methodology', 'Specialization', 'Thesis']
    },
    'univ-diploma': {
        title: 'Diploma in IT',
        duration: '3 Years',
        description: 'Polytechnic diploma in information technology.',
        topics: ['IT Fundamentals', 'Programming', 'Networking', 'Web Development', 'Industrial Training']
    },
    
    // Robotics Courses
    'robot-intro': {
        title: 'Introduction to Robotics',
        duration: '3 Months',
        description: 'Basic robotics concepts and hands-on projects.',
        topics: ['Robotics Basics', 'Sensors & Actuators', 'Simple Projects', 'Programming Basics']
    },
    'robot-arduino': {
        title: 'Arduino Programming & Projects',
        duration: '4 Months',
        description: 'Learn Arduino programming with practical projects.',
        topics: ['Arduino IDE', 'Circuit Design', 'Sensor Integration', 'Motor Control', 'IoT Projects']
    },
    'robot-pi': {
        title: 'Raspberry Pi & IoT',
        duration: '4 Months',
        description: 'IoT development using Raspberry Pi.',
        topics: ['Raspberry Pi Setup', 'Python Programming', 'IoT Protocols', 'Smart Home Projects']
    },
    'robot-advanced': {
        title: 'Advanced Robotics & AI Integration',
        duration: '6 Months',
        description: 'Advanced robotics with AI and machine learning.',
        topics: ['Computer Vision', 'AI Integration', 'Machine Learning', 'Advanced Sensors', 'Autonomous Systems']
    },
    'robot-drone': {
        title: 'Drone Technology & Programming',
        duration: '5 Months',
        description: 'Drone technology, programming, and applications.',
        topics: ['Drone Basics', 'Flight Control', 'Programming', 'Aerial Photography', 'Regulations']
    },
    'robot-industrial': {
        title: 'Industrial Automation & Robotics',
        duration: '6 Months',
        description: 'Industrial robotics and automation systems.',
        topics: ['PLC Programming', 'Industrial Robots', 'Automation Systems', 'SCADA', 'Safety Standards']
    },
    
    // Digital Marketing Courses
    'dm-basic': {
        title: 'BASIC DIGITAL MARKETING COURSE',
        duration: '2.5 Months',
        description: 'Foundation course covering all essential digital marketing skills with AI tools and practical projects.',
        topics: [
            '1. Introduction to Digital Marketing',
            '2. Website Designing (No Code)',
            '3. SEO – Search Engine Optimization (Basic)',
            '4. Social Media Marketing (Basic)',
            '5. Canva Designing + Content Writing',
            '6. Google My Business Optimization',
            '7. WhatsApp Marketing',
            '8. Email Marketing (Beginner)',
            '9. Introduction to Google Ads',
            '10. Freelancing + Resume Building',
            '🧠 BONUS MODULES:',
            '• AI Tools: ChatGPT, Canva AI',
            '• Mobile Video Editing: CapCut',
            '• Vibe Marketing Basics',
            '• Mini projects & mock interviews'
        ]
    },
    'dm-advanced': {
        title: 'ADVANCED DIGITAL MARKETING COURSE',
        duration: '6 Months',
        description: 'Comprehensive advanced digital marketing course including all basic modules plus advanced strategies, AI mastery, and live projects.',
        topics: [
            '📚 ALL BASIC MODULES (1–10) INCLUDED',
            '11. Google Ads – Advanced',
            '12. Meta Ads (Facebook & Instagram)',
            '13. SEO – Advanced',
            '14. AI in Digital Marketing',
            '15. Funnel Building & Landing Pages',
            '16. WhatsApp Funnel Mastery',
            '17. Instagram Reels & Viral Strategy (2025 Edition)',
            '18. LinkedIn Marketing & Lead Generation',
            '19. YouTube Marketing + Shorts',
            '20. Affiliate & Influencer Marketing',
            '21. Vibe Marketing & Emotional Branding',
            '22. Analytics & Reporting',
            '23. Freelancing, Personal Branding & Live Projects',
            '🧠 BONUS MODULES:',
            '• AI Power Tools Mastery',
            '• Personal Branding Accelerator',
            '• Viral Reels Creation Masterclass',
            '• Lead Magnet Creation',
            '• Client Pitching and Proposal Templates',
            '• Local Business Marketing Blueprint',
            '• E-commerce Growth Mastery'
        ]
    }
};

// Show Course Details
function showDetails(courseId) {
    const course = courseDetails[courseId];
    if (!course) return;
    
    const syllabusLink = course.link ? `<p class="syllabus-link"><a href="${course.link}" target="_blank" rel="noopener noreferrer"><i class="fas fa-file-pdf"></i> Download Syllabus PDF</a></p>` : '';
    
    const detailsHTML = `
        <div class="course-details-modal" id="courseModal">
            <div class="modal-content">
                <span class="close-modal" onclick="closeModal()">&times;</span>
                <h2>${course.title}</h2>
                <p class="duration"><i class="fas fa-clock"></i> Duration: ${course.duration}</p>
                <p class="description">${course.description}</p>
                ${syllabusLink}
                <h3>Topics Covered:</h3>
                <ul class="topics-list">
                    ${course.topics.map(topic => `<li>${topic}</li>`).join('')}
                </ul>
                <button class="enroll-btn" onclick="scrollToEnquiry()">Enquire Now</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', detailsHTML);
    document.body.style.overflow = 'hidden';
}

// Close Modal
function closeModal() {
    const modal = document.getElementById('courseModal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

// Scroll to Enquiry Form
function scrollToEnquiry() {
    closeModal();
    document.getElementById('enquiry').scrollIntoView({ behavior: 'smooth' });
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('courseModal');
    if (modal && event.target === modal) {
        closeModal();
    }
});

// Console log for tracking
console.log('THE PROFESSIONALS - Landing Page Loaded Successfully');
console.log('All IT & AI courses are available for enquiry');
