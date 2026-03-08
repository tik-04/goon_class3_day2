import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check, Terminal, ArrowUp, Database, Code2, Search, Lock, Unlock, Sparkles } from 'lucide-react';

// --- Component กล่องโค้ดสุดสวย ---
const CodeBlock = ({ code, language, title }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mb-10 bg-[#1e1e1e] rounded-2xl shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 border border-white/5 overflow-hidden group animate-fade-in-up">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/5 bg-white/5 backdrop-blur-md">
        <span className="font-mono text-sm text-gray-400 flex items-center gap-2.5">
          <div className="flex gap-1.5 mr-2">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/40"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/40"></div>
          </div>
          <Terminal size={14} className="text-blue-400" />
          {title}
        </span>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-2 px-4 py-1.5 text-xs font-bold rounded-full transition-all duration-300 ${
            copied 
            ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
            : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/15 hover:text-white'
          }`}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{ margin: 0, padding: '1.75rem', fontSize: '0.9rem', background: 'transparent', lineHeight: '1.6' }}
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  );
};

export default function App() {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [showDetectiveGame, setShowDetectiveGame] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const unlockGame = () => {
    setShowDetectiveGame(true);
    setTimeout(() => {
      document.getElementById('detective-game')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  // --- ข้อมูล Code (ข้อความเดิมทั้งหมด) ---
  const dockerComposeCode = `version: '3.8'\n\nservices:\n  postgres:\n    image: postgres:latest\n    container_name: postgres\n    environment:\n      POSTGRES_DB: mydatabase\n      POSTGRES_USER: myuser\n      POSTGRES_PASSWORD: mypassword\n    volumes:\n      - postgres_data:/var/lib/postgresql\n    ports:\n      - "5432:5432"\n    restart: unless-stopped\n\n  pgadmin:\n    image: dpage/pgadmin4:latest\n    container_name: pgadmin\n    environment:\n      PGADMIN_DEFAULT_EMAIL: admin@admin.com\n      PGADMIN_DEFAULT_PASSWORD: admin\n    ports:\n      - "5050:80"\n    depends_on:\n      - postgres\n    restart: unless-stopped\n\nvolumes:\n  postgres_data:`;
const sqlCreateTable = `
-- สร้าง Data Type แบบระบุค่าเฉพาะ (Enum)
CREATE TYPE course_type AS ENUM ('CS', 'DSI', 'IT');

-- สร้างตารางนักศึกษา
CREATE TABLE Student (
    ID INT PRIMARY KEY,
    Name VARCHAR(50),
    Age INT,
    Course course_type
);

-- เพิ่มข้อมูลนักศึกษา 20 แถว (มีชื่อซ้ำ vavy, mokun, sunny)
INSERT INTO Student (ID, Name, Age, Course) VALUES
(1, 'vavy', 20, 'CS'),
(2, 'vavy', 21, 'IT'),
(3, 'mokun', 22, 'DSI'),
(4, 'mokun', 20, 'CS'),
(5, 'sunny', 23, 'IT'),
(6, 'sunny', 22, 'CS'),
(7, 'Alice', 19, 'DSI'),
(8, 'Bob', 21, 'IT'),
(9, 'Charlie', 20, 'CS'),
(10, 'David', 22, 'DSI'),
(11, 'Eve', 21, 'IT'),
(12, 'Frank', 23, 'CS'),
(13, 'Grace', 20, 'DSI'),
(14, 'Heidi', 22, 'IT'),
(15, 'Ivan', 21, 'CS'),
(16, 'Judy', 19, 'DSI'),
(17, 'Mallory', 20, 'IT'),
(18, 'Niaj', 23, 'CS'),
(19, 'Olivia', 21, 'DSI'),
(20, 'Peggy', 22, 'IT');
`;
  const sqlSelect = `-- เลือกดูข้อมูลทั้งหมดทุกคอลัมน์\nSELECT * FROM student;\n\n-- เลือกดูข้อมูลเฉพาะบางคอลัมน์\nSELECT id, name, age, course\nFROM student;`;
  const sqlInsert = `-- เพิ่มข้อมูล 1 รายการ\nINSERT INTO student(id, name, age, course)\nVALUES (21, 'mokun', 13, 'IT');\n\n-- เพิ่มข้อมูลหลายรายการพร้อมกัน\nINSERT INTO student(id, name, age, course)\nVALUES \n    (22, 'mokun2', 14, 'IT'),\n    (23, 'mokun3', 15, 'CS'),\n    (24, 'kunmo', 16, 'DSI');`;
  const sqlUpdate = `-- อัปเดตข้อมูลของนักศึกษาที่มี ID = 8\nUPDATE student\nSET name='mokun4', age=81, course='IT'\nWHERE id=8;`;
  const sqlDelete = `-- ลบข้อมูลนักศึกษาที่มี ID = 8\nDELETE FROM student\nWHERE id=8;`;
  const sqlQuery = `-- ค้นหาด้วยเงื่อนไข (Where)\nSELECT * FROM student\nWHERE name='kunmo';\n\n-- ใช้เงื่อนไขร่วม (AND, OR)\nSELECT * FROM student\nWHERE name='mokun'\nAND (id = 5 OR age > 22);\n\n-- เรียงลำดับข้อมูล (Order By) จากน้อยไปมาก\nSELECT * FROM student\nORDER BY age ASC;`;

//   const sqlDetectiveCode = `-- ============================================
// -- 🏰 SQL DETECTIVE: MURDER MYSTERY DATABASE
// -- ============================================

// -- Drop old tables if exists (for fresh start)
// DROP TABLE IF EXISTS crime_logs;
// DROP TABLE IF EXISTS weapons;
// DROP TABLE IF EXISTS rooms;
// DROP TABLE IF EXISTS suspects;

// -- ============================================
// -- 📊 TABLE 1: SUSPECTS
// -- ============================================
// CREATE TABLE suspects (
//     suspect_id INT PRIMARY KEY,
//     suspect_name VARCHAR(100) NOT NULL,
//     age INT NOT NULL,
//     blood_type VARCHAR(5),
//     occupation VARCHAR(100),
//     has_money_motive VARCHAR(5),
//     has_revenge_motive VARCHAR(5),
//     has_secret_motive VARCHAR(5),
//     alibi VARCHAR(255)
// );

// INSERT INTO suspects (suspect_id, suspect_name, age, blood_type, occupation, has_money_motive, has_revenge_motive, has_secret_motive, alibi) VALUES
// (1, 'John Smith', 35, 'AB', 'Chef', 'NO', 'YES', 'NO', 'Claims he was in kitchen all night'),
// (2, 'Sarah Rich', 42, 'O', 'Businesswoman', 'YES', 'NO', 'NO', 'Claims she was on phone call'),
// (3, 'Dr. Victor Wise', 38, 'AB', 'Doctor', 'NO', 'NO', 'YES', 'Claims he was in library'),
// (4, 'Mary Beauty', 28, 'A', 'Model', 'NO', 'YES', 'NO', 'Claims she was in bedroom'),
// (5, 'Robert Fair', 45, 'B', 'Lawyer', 'YES', 'NO', 'NO', 'Claims he was walking in garden'),
// (6, 'Lisa Hard', 31, 'AB', 'Secretary', 'NO', 'YES', 'YES', 'Claims she was in office'),
// (7, 'David Brave', 29, 'O', 'Bodyguard', 'NO', 'YES', 'NO', 'Claims he was patrolling'),
// (8, 'Amy Artist', 33, 'A', 'Painter', 'NO', 'YES', 'NO', 'Claims she was painting in studio'),
// (9, 'Steven Wealth', 50, 'AB', 'Investor', 'YES', 'NO', 'NO', 'Claims he was smoking cigars on balcony'),
// (10, 'Nina Cute', 25, 'B', 'Waitress', 'NO', 'YES', 'NO', 'Claims she was cleaning kitchen'),
// (11, 'Peter Justice', 40, 'O', 'Detective', 'YES', 'NO', 'NO', 'Claims he was investigating'),
// (12, 'Susan Cold', 36, 'AB', 'Pharmacist', 'NO', 'NO', 'YES', 'Claims she was reading in guest room'),
// (13, 'Charlie Lucky', 27, 'A', 'Programmer', 'YES', 'NO', 'NO', 'Claims he was gaming in living room'),
// (14, 'Grace Bright', 32, 'B', 'Piano Teacher', 'NO', 'YES', 'NO', 'Claims she was practicing in music room'),
// (15, 'Richard Rise', 48, 'O', 'Politician', 'NO', 'NO', 'YES', 'Claims he was on conference call'),
// (16, 'Carol Kind', 26, 'AB', 'Nurse', 'NO', 'NO', 'YES', 'Claims she was caring for patient'),
// (17, 'William Strong', 44, 'A', 'Military', 'NO', 'YES', 'NO', 'Claims he was cleaning weapons in display room'),
// (18, 'Melissa Scent', 30, 'B', 'Journalist', 'NO', 'NO', 'YES', 'Claims she was writing article'),
// (19, 'Thomas Grand', 37, 'O', 'Hotel Owner', 'YES', 'NO', 'NO', 'Claims he was checking wine in storage'),
// (20, 'Patricia Elegant', 34, 'AB', 'Actress', 'NO', 'YES', 'NO', 'Claims she was reading script in lounge');

// -- ============================================
// -- 🚪 TABLE 2: ROOMS
// -- ============================================
// CREATE TABLE rooms (
//     room_id INT PRIMARY KEY,
//     room_name VARCHAR(100) NOT NULL,
//     floor INT NOT NULL,
//     has_secret_passage VARCHAR(5),
//     is_crime_scene VARCHAR(5)
// );

// INSERT INTO rooms (room_id, room_name, floor, has_secret_passage, is_crime_scene) VALUES
// (1, 'Kitchen', 1, 'NO', 'NO'),
// (2, 'Living Room', 1, 'YES', 'NO'),
// (3, 'Library', 1, 'YES', 'NO'),
// (4, 'Dining Room', 1, 'NO', 'YES'),
// (5, 'Office', 1, 'NO', 'NO'),
// (6, 'Bedroom', 2, 'NO', 'NO'),
// (7, 'Garden', 0, 'NO', 'NO'),
// (8, 'Art Studio', 2, 'NO', 'NO'),
// (9, 'Balcony', 2, 'NO', 'NO'),
// (10, 'Music Room', 2, 'YES', 'NO'),
// (11, 'Medical Room', 1, 'NO', 'NO'),
// (12, 'Display Room', 1, 'NO', 'NO'),
// (13, 'Storage', 0, 'YES', 'NO'),
// (14, 'Lounge', 1, 'NO', 'NO'),
// (15, 'Guest Room', 2, 'NO', 'NO'),
// (16, 'Billiard Room', 1, 'NO', 'NO'),
// (17, 'Smoking Room', 1, 'NO', 'NO'),
// (18, 'Main Bathroom', 1, 'NO', 'NO'),
// (19, 'Attic', 3, 'YES', 'NO'),
// (20, 'Basement', -1, 'YES', 'NO');

// -- ============================================
// -- 🔪 TABLE 3: WEAPONS
// -- ============================================
// CREATE TABLE weapons (
//     weapon_id INT PRIMARY KEY,
//     weapon_name VARCHAR(100) NOT NULL,
//     weapon_type VARCHAR(50),
//     found_in_room_id INT,
//     has_fingerprints VARCHAR(5),
//     blood_type_on_weapon VARCHAR(5),
//     is_murder_weapon VARCHAR(5),
//     CONSTRAINT fk_weapon_room FOREIGN KEY (found_in_room_id) REFERENCES rooms(room_id)
// );

// INSERT INTO weapons (weapon_id, weapon_name, weapon_type, found_in_room_id, has_fingerprints, blood_type_on_weapon, is_murder_weapon) VALUES
// (1, 'Kitchen Knife', 'Sharp', 1, 'YES', 'AB', 'YES'),
// (2, 'Rope', 'Strangulation', 3, 'NO', 'NULL', 'NO'),
// (3, 'Baseball Bat', 'Blunt', 16, 'YES', 'O', 'NO'),
// (4, 'Pistol', 'Gun', 5, 'YES', 'NULL', 'NO'),
// (5, 'Wine Bottle', 'Blunt', 4, 'YES', 'AB', 'NO'),
// (6, 'Pillow', 'Strangulation', 6, 'NO', 'NULL', 'NO'),
// (7, 'Screwdriver', 'Sharp', 13, 'YES', 'A', 'NO'),
// (8, 'Arsenic Poison', 'Poison', 11, 'NO', 'NULL', 'YES'),
// (9, 'Hammer', 'Blunt', 20, 'YES', 'B', 'NO'),
// (10, 'Garden Scissors', 'Sharp', 7, 'YES', 'AB', 'NO'),
// (11, 'Cable', 'Strangulation', 2, 'NO', 'NULL', 'NO'),
// (12, 'Sword', 'Sharp', 12, 'YES', 'O', 'NO'),
// (13, 'Tripod', 'Blunt', 8, 'NO', 'A', 'NO'),
// (14, 'Cyanide', 'Poison', 11, 'NO', 'NULL', 'NO'),
// (15, 'Walking Stick', 'Blunt', 14, 'YES', 'NULL', 'NO'),
// (16, 'Billiard Ball', 'Blunt', 16, 'NO', 'B', 'NO'),
// (17, 'Glass Shard', 'Sharp', 18, 'YES', 'AB', 'NO'),
// (18, 'Wire', 'Strangulation', 19, 'YES', 'O', 'NO'),
// (19, 'Wrench', 'Blunt', 13, 'YES', 'AB', 'NO'),
// (20, 'Plastic Bag', 'Strangulation', 1, 'NO', 'NULL', 'NO');

// -- ============================================
// -- 📝 TABLE 4: CRIME_LOGS
// -- ============================================
// CREATE TABLE crime_logs (
//     log_id INT PRIMARY KEY,
//     suspect_id INT,
//     room_id INT,
//     entry_time VARCHAR(10) NOT NULL,
//     exit_time VARCHAR(10),
//     is_near_crime_time VARCHAR(5),
//     FOREIGN KEY (suspect_id) REFERENCES suspects(suspect_id),
//     FOREIGN KEY (room_id) REFERENCES rooms(room_id)
// );

// INSERT INTO crime_logs (log_id, suspect_id, room_id, entry_time, exit_time, is_near_crime_time) VALUES
// (1, 1, 1, '18:00', '19:00', 'NO'),
// (2, 2, 5, '17:00', '17:45', 'NO'),
// (3, 3, 3, '16:30', '18:30', 'NO'),
// (4, 4, 6, '19:00', '20:00', 'YES'),
// (5, 5, 7, '18:30', '19:30', 'YES'),
// (6, 6, 5, '17:30', '18:00', 'NO'),
// (7, 7, 7, '19:00', '20:30', 'YES'),
// (8, 8, 8, '15:00', '21:00', 'YES'),
// (9, 9, 9, '18:00', '19:00', 'NO'),
// (10, 10, 1, '18:30', '19:30', 'YES'),
// (11, 11, 14, '17:00', '18:00', 'NO'),
// (12, 12, 15, '16:00', '20:00', 'YES'),
// (13, 13, 2, '19:30', '21:00', 'YES'),
// (14, 14, 10, '17:00', '18:30', 'NO'),
// (15, 15, 5, '16:00', '17:00', 'NO'),
// (16, 16, 11, '18:00', '20:00', 'YES'),
// (17, 17, 12, '18:00', '19:00', 'NO'),
// (18, 18, 5, '19:00', '20:00', 'YES'),
// (19, 19, 13, '17:30', '18:30', 'NO'),
// (20, 20, 14, '18:00', '19:30', 'YES'),
// (21, 1, 4, '19:15', '19:45', 'YES'),
// (22, 3, 11, '19:00', '19:30', 'YES'),
// (23, 6, 4, '19:30', '20:00', 'YES'),
// (24, 9, 17, '19:15', '19:45', 'YES'),
// (25, 12, 11, '19:45', '20:15', 'YES');

// -- ============================================
// -- ✅ Verify all data created
// -- ============================================
// SELECT 'Suspects' AS TableName, COUNT(*) AS RecordCount FROM suspects
// UNION ALL
// SELECT 'Rooms', COUNT(*) FROM rooms
// UNION ALL
// SELECT 'Weapons', COUNT(*) FROM weapons
// UNION ALL
// SELECT 'Crime Logs', COUNT(*) FROM crime_logs;`;

  return (
    <div className="min-h-screen selection:bg-blue-500/30 selection:text-blue-900 pb-20 overflow-x-hidden">
      
      {/* Navbar Mobile */}
      <div className="md:hidden bg-white/70 backdrop-blur-xl border-b border-white/20 sticky top-0 z-40 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent animate-gradient-x">
          DevDocs
        </h1>
        {showDetectiveGame && (
          <a href="#detective-game" className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-[10px] uppercase tracking-widest font-bold rounded-full shadow-lg transition-all">
            <Search size={12} /> Mystery Game
          </a>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 flex flex-col md:flex-row gap-16">
        
        {/* --- Sidebar --- */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-16 space-y-8">
            <div className="space-y-2">
              <h1 className="text-4xl font-black bg-gradient-to-br from-blue-600 to-violet-700 bg-clip-text text-transparent">
                DevDocs
              </h1>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Database & SQL Guide</p>
            </div>
            
            {showDetectiveGame && (
              <a href="#detective-game" className="group flex items-center justify-center gap-3 w-full px-6 py-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white text-sm font-bold rounded-2xl shadow-xl hover:-translate-y-1 transition-all duration-500 border border-slate-700">
                <Search size={18} className="text-yellow-400 group-hover:rotate-12 transition-transform" />
                SQL Detective
              </a>
            )}
            
            <nav className="space-y-1">
              <div className="h-1 w-12 bg-blue-600 rounded-full mb-6"></div>
              <a href="#docker" className="block py-2.5 text-sm font-semibold text-slate-500 hover:text-blue-600 transition-all duration-300">1. Docker Setup</a>
              <div className="pt-4 pb-2 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">SQL Commands</div>
              <a href="#sql-create" className="block py-2 text-sm font-semibold text-slate-500 hover:text-blue-600 transition-all">Create Table</a>
              <a href="#sql-insert" className="block py-2 text-sm font-semibold text-slate-500 hover:text-blue-600 transition-all">Insert Data</a>
              <a href="#sql-select" className="block py-2 text-sm font-semibold text-slate-500 hover:text-blue-600 transition-all">Select Data</a>
              <a href="#sql-update" className="block py-2 text-sm font-semibold text-slate-500 hover:text-blue-600 transition-all">Update Data</a>
              <a href="#sql-delete" className="block py-2 text-sm font-semibold text-slate-500 hover:text-blue-600 transition-all">Delete Data</a>
              <a href="#sql-query" className="block py-2 text-sm font-semibold text-slate-500 hover:text-blue-600 transition-all">Advanced Queries</a>
            </nav>
          </div>
        </aside>

        {/* --- Main Content --- */}
        <main className="flex-1 max-w-3xl">
          
          <section id="docker" className="scroll-mt-24 mb-20">
            <div className="flex items-center gap-4 mb-8 group">
              <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-200 group-hover:rotate-6 transition-transform duration-300">
                <Database size={28} />
              </div>
              <h2 className="text-3xl font-black text-slate-800 tracking-tight">1. Setup Database (Docker)</h2>
            </div>
            <p className="text-slate-600 mb-8 leading-relaxed">
              สร้างไฟล์ <code className="bg-blue-50 text-blue-600 px-2 py-1 rounded-lg text-xs font-bold font-mono border border-blue-100">docker-compose.yml</code> แล้ววางโค้ดด้านล่างนี้ จากนั้นรันคำสั่ง <code className="bg-slate-100 text-pink-600 px-2 py-1 rounded-lg text-xs font-bold font-mono">docker-compose up -d</code>
            </p>
            <CodeBlock code={dockerComposeCode} language="yaml" title="docker-compose.yml" />
          </section>

          <section className="mb-20">
            <div className="flex items-center gap-4 mb-12">
              <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-200">
                <Code2 size={28} />
              </div>
              <h2 className="text-3xl font-black text-slate-800 tracking-tight">2. คำสั่ง SQL พื้นฐาน (CRUD)</h2>
            </div>

            <div className="space-y-16">
              <div id="sql-create" className="scroll-mt-24">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 rounded-full bg-blue-500"></span>Create Table (สร้างตาราง)
                </h3>
                <CodeBlock code={sqlCreateTable} language="sql" title="01-create-table.sql" />
              </div>

              <div id="sql-insert" className="scroll-mt-24">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 rounded-full bg-emerald-500"></span>Insert (เพิ่มข้อมูล)
                </h3>
                <CodeBlock code={sqlInsert} language="sql" title="02-insert-data.sql" />
              </div>

              <div id="sql-select" className="scroll-mt-24">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 rounded-full bg-sky-500"></span>Select (ดึงข้อมูล)
                </h3>
                <CodeBlock code={sqlSelect} language="sql" title="03-select-data.sql" />
              </div>

              <div id="sql-update" className="scroll-mt-24">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 rounded-full bg-orange-500"></span>Update (แก้ไขข้อมูล)
                </h3>
                <CodeBlock code={sqlUpdate} language="sql" title="04-update-data.sql" />
              </div>

              <div id="sql-delete" className="scroll-mt-24">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 rounded-full bg-red-500"></span>Delete (ลบข้อมูล)
                </h3>
                <CodeBlock code={sqlDelete} language="sql" title="05-delete-data.sql" />
              </div>

              <div id="sql-query" className="scroll-mt-24">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 rounded-full bg-purple-500"></span>Advanced Queries (เงื่อนไข & เรียงลำดับ)
                </h3>
                <CodeBlock code={sqlQuery} language="sql" title="06-queries.sql" />
              </div>
            </div>
          </section>
          
          {/* {!showDetectiveGame && (
            <div className="text-center py-20 relative">
              <button
                onClick={unlockGame}
                className="group relative inline-flex items-center justify-center px-10 py-5 font-black text-white bg-slate-900 rounded-3xl shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-slate-700 active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                <div className="relative flex items-center gap-3">
                   <Lock size={20} className="group-hover:opacity-0 group-hover:scale-0 transition-all duration-500" />
                   <Unlock size={20} className="absolute opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 text-yellow-300" />
                   <span>ปลดล็อกกิจกรรมลับ!</span>
                   <Sparkles size={18} className="animate-pulse text-blue-300" />
                </div>
              </button>
              <p className="mt-6 text-sm font-bold text-slate-400 uppercase tracking-widest">มีอะไรซ่อนอยู่กันนะ...? 🤔</p>
            </div>
          )}

          {showDetectiveGame && (
            <section id="detective-game" className="scroll-mt-24 mb-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-1 rounded-[2.5rem] shadow-2xl group">
              <div className="bg-slate-900/50 backdrop-blur-3xl p-8 sm:p-12 rounded-[2.3rem] overflow-hidden relative">
                <div className="absolute top-0 right-0 p-10 opacity-[0.03]">
                  <Search size={300} />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="p-4 bg-yellow-400 text-slate-900 rounded-2xl shadow-xl shadow-yellow-400/20 rotate-3">
                      <Search size={32} />
                    </div>
                    <div>
                      <h2 className="text-4xl font-black text-white tracking-tighter">กิจกรรม: SQL Detective 🕵️‍♂️</h2>
                      <div className="h-1 w-20 bg-yellow-400 mt-2 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md mb-10">
                    <h3 className="text-2xl font-bold text-yellow-400 mb-4">คดีฆาตกรรมปริศนา!</h3>
                    <p className="text-slate-300 leading-relaxed text-lg mb-6">
                      เกิดเหตุฆาตกรรมขึ้นในคฤหาสน์แห่งหนึ่ง ตำรวจได้รวบรวมข้อมูลผู้ต้องสงสัย (Suspects), ห้องต่างๆ (Rooms), อาวุธ (Weapons) และบันทึกการเข้าออก (Crime Logs) ไว้ในฐานข้อมูลเรียบร้อยแล้ว
                    </p>
                    <p className="text-green-400 font-bold mb-4">ภารกิจของคุณ: ใช้คำสั่ง SQL เพื่อสืบหาว่า "ใครคือฆาตกรตัวจริง?"</p>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">👉 ก๊อปปี้โค้ดด้านล่างนี้ไปรันใน PgAdmin เพื่อสร้างฐานข้อมูลสำหรับจำลองคดีได้เลย</p>
                  </div>

                  <CodeBlock code={sqlDetectiveCode} language="sql" title="murder-mystery-setup.sql" />
                </div>
              </div>
            </section>
          )} */}

        </main>
      </div>

      <button
        onClick={scrollToTop}
        className={`fixed bottom-10 right-10 p-4 rounded-2xl bg-white text-slate-900 shadow-2xl border border-slate-100 hover:bg-slate-900 hover:text-white hover:-translate-y-2 transition-all duration-500 z-50 group ${
          showTopBtn ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'
        }`}
      >
        <ArrowUp size={24} className="group-hover:animate-bounce" />
      </button>

    </div>
  );
}