import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check, Terminal, ArrowUp, Database, Code2 } from 'lucide-react';

// --- Component กล่องโค้ดสุดสวย ---
const CodeBlock = ({ code, language, title }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mb-10 bg-[#1e1e1e] rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-200 overflow-hidden group">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700 bg-[#2d2d2d]">
        <span className="font-mono text-sm text-gray-300 flex items-center gap-2">
          <Terminal size={16} className="text-gray-400" />
          {title}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-300 bg-white/10 border border-transparent rounded-lg hover:bg-white/20 hover:text-white transition-all duration-200 opacity-80 group-hover:opacity-100"
        >
          {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{ margin: 0, padding: '1.5rem', fontSize: '0.95rem', background: 'transparent' }}
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  );
};

export default function App() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  // --- จัดการปุ่ม Back to Top ---
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- ข้อมูล Code ---
  const dockerComposeCode = `version: '3.8'\n\nservices:\n  postgres:\n    image: postgres:latest\n    container_name: postgres\n    environment:\n      POSTGRES_DB: mydatabase\n      POSTGRES_USER: myuser\n      POSTGRES_PASSWORD: mypassword\n    volumes:\n      - postgres_data:/var/lib/postgresql\n    ports:\n      - "5432:5432"\n    restart: unless-stopped\n\n  pgadmin:\n    image: dpage/pgadmin4:latest\n    container_name: pgadmin\n    environment:\n      PGADMIN_DEFAULT_EMAIL: admin@admin.com\n      PGADMIN_DEFAULT_PASSWORD: admin\n    ports:\n      - "5050:80"\n    depends_on:\n      - postgres\n    restart: unless-stopped\n\nvolumes:\n  postgres_data:`;
  const sqlCreateTable = `-- สร้าง Data Type แบบระบุค่าเฉพาะ (Enum)\nCREATE TYPE course_type AS ENUM ('CS', 'DSI', 'IT');\n\n-- สร้างตารางนักศึกษา\nCREATE TABLE Student (\n    ID INT PRIMARY KEY,\n    Name VARCHAR(50),\n    Age INT,\n    Course course_type\n);`;
  const sqlSelect = `-- เลือกดูข้อมูลทั้งหมดทุกคอลัมน์\nSELECT * FROM student;\n\n-- เลือกดูข้อมูลเฉพาะบางคอลัมน์\nSELECT id, name, age, course\nFROM student;`;
  const sqlInsert = `-- เพิ่มข้อมูล 1 รายการ\nINSERT INTO student(id, name, age, course)\nVALUES (5, 'mokun', 13, 'IT');\n\n-- เพิ่มข้อมูลหลายรายการพร้อมกัน\nINSERT INTO student(id, name, age, course)\nVALUES \n    (6, 'mokun2', 14, 'IT'),\n    (7, 'mokun3', 15, 'CS'),\n    (8, 'kunmo', 16, 'DSI');`;
  const sqlUpdate = `-- อัปเดตข้อมูลของนักศึกษาที่มี ID = 8\nUPDATE student\nSET name='mokun4', age=81, course='IT'\nWHERE id=8;`;
  const sqlDelete = `-- ลบข้อมูลนักศึกษาที่มี ID = 8\nDELETE FROM student\nWHERE id=8;`;
  const sqlQuery = `-- ค้นหาด้วยเงื่อนไข (Where)\nSELECT * FROM student\nWHERE name='kunmo';\n\n-- ใช้เงื่อนไขร่วม (AND, OR)\nSELECT * FROM student\nWHERE name='mokun'\nAND (id = 5 OR age > 22);\n\n-- เรียงลำดับข้อมูล (Order By) จากน้อยไปมาก\nSELECT * FROM student\nORDER BY age ASC;`;

  return (
    <div className="min-h-screen font-sans selection:bg-blue-200 selection:text-blue-900">
      
      {/* Navbar สำหรับ Mobile */}
      <div className="md:hidden bg-white/80 backdrop-blur-md border-b sticky top-0 z-40 p-4">
        <h1 className="text-xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          goonDocs
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-12">
        
        {/* --- Sidebar (Table of Contents) --- */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-12">
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              GoonDocs
            </h1>
            <p className="text-sm text-gray-500 mb-8">คู่มือ Database & SQL สำหรับน้องๆ</p>
            
            <nav className="space-y-1 border-l-2 border-gray-100 pl-4">
              <a href="#docker" className="block py-2 text-sm text-gray-600 hover:text-blue-600 font-medium transition-colors">
                1. Docker Setup
              </a>
              <div className="pt-4 pb-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                SQL Commands
              </div>
              <a href="#sql-create" className="block py-1.5 text-sm text-gray-600 hover:text-blue-600 transition-colors">Create Table</a>
              <a href="#sql-insert" className="block py-1.5 text-sm text-gray-600 hover:text-blue-600 transition-colors">Insert Data</a>
              <a href="#sql-select" className="block py-1.5 text-sm text-gray-600 hover:text-blue-600 transition-colors">Select Data</a>
              <a href="#sql-update" className="block py-1.5 text-sm text-gray-600 hover:text-blue-600 transition-colors">Update Data</a>
              <a href="#sql-delete" className="block py-1.5 text-sm text-gray-600 hover:text-blue-600 transition-colors">Delete Data</a>
              <a href="#sql-query" className="block py-1.5 text-sm text-gray-600 hover:text-blue-600 transition-colors">Advanced Queries</a>
            </nav>
          </div>
        </aside>

        {/* --- Main Content --- */}
        <main className="flex-1 max-w-3xl">
          
          {/* Header Mobile (ถ้าดูในคอมจะไม่เห็น) */}
          <div className="md:hidden text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900">คู่มือ Database & SQL</h2>
            <p className="mt-2 text-gray-500">สำหรับน้องๆ กด Copy ไปรันได้เลย!</p>
          </div>

          {/* Section 1: Docker */}
          <section id="docker" className="scroll-mt-24 mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Database size={24} /></div>
              <h2 className="text-2xl font-bold text-gray-900">1. Setup Database (Docker)</h2>
            </div>
            <p className="text-gray-600 mb-4 leading-relaxed">
              สร้างไฟล์ <code className="bg-gray-100 text-pink-500 px-1.5 py-0.5 rounded text-sm font-mono">docker-compose.yml</code> แล้ววางโค้ดด้านล่างนี้ จากนั้นรันคำสั่ง <code className="bg-gray-100 text-pink-500 px-1.5 py-0.5 rounded text-sm font-mono">docker-compose up -d</code>
            </p>
            <CodeBlock code={dockerComposeCode} language="yaml" title="docker-compose.yml" />
          </section>

          <hr className="border-gray-200 mb-16" />

          {/* Section 2: SQL */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg"><Code2 size={24} /></div>
              <h2 className="text-2xl font-bold text-gray-900">2. คำสั่ง SQL พื้นฐาน (CRUD)</h2>
            </div>

            <div className="space-y-12">
              <div id="sql-create" className="scroll-mt-24">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 border-l-4 border-indigo-500 pl-3">Create Table (สร้างตาราง)</h3>
                <CodeBlock code={sqlCreateTable} language="sql" title="01-create-table.sql" />
              </div>

              <div id="sql-insert" className="scroll-mt-24">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 border-l-4 border-emerald-500 pl-3">Insert (เพิ่มข้อมูล)</h3>
                <CodeBlock code={sqlInsert} language="sql" title="02-insert-data.sql" />
              </div>

              <div id="sql-select" className="scroll-mt-24">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 border-l-4 border-sky-500 pl-3">Select (ดึงข้อมูล)</h3>
                <CodeBlock code={sqlSelect} language="sql" title="03-select-data.sql" />
              </div>

              <div id="sql-update" className="scroll-mt-24">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 border-l-4 border-amber-500 pl-3">Update (แก้ไขข้อมูล)</h3>
                <CodeBlock code={sqlUpdate} language="sql" title="04-update-data.sql" />
              </div>

              <div id="sql-delete" className="scroll-mt-24">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 border-l-4 border-red-500 pl-3">Delete (ลบข้อมูล)</h3>
                <CodeBlock code={sqlDelete} language="sql" title="05-delete-data.sql" />
              </div>

              <div id="sql-query" className="scroll-mt-24">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 border-l-4 border-purple-500 pl-3">Advanced Queries (เงื่อนไข & เรียงลำดับ)</h3>
                <CodeBlock code={sqlQuery} language="sql" title="06-queries.sql" />
              </div>
            </div>
          </section>

        </main>
      </div>

      {/* Floating Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 hover:scale-110 hover:shadow-blue-500/30 transition-all duration-300 z-50 ${
          showTopBtn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        <ArrowUp size={24} />
      </button>

    </div>
  );
}