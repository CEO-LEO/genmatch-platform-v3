'use client';

import { useState } from 'react';
import Link from 'next/link';

interface TestResult {
  name: string;
  status: 'PASS' | 'FAIL' | 'RUNNING';
  result?: any;
  error?: string;
}

export default function TestSystemPage() {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const runTest = async (testName: string, endpoint: string, method: 'GET' | 'POST' = 'GET', body?: any) => {
    try {
      const response = await fetch(endpoint, {
        method,
        headers: body ? { 'Content-Type': 'application/json' } : {},
        body: body ? JSON.stringify(body) : undefined
      });
      
      const data = await response.json();
      
      if (response.ok) {
        return { status: 'PASS' as const, result: data };
      } else {
        return { status: 'FAIL' as const, error: data.error || 'Request failed' };
      }
    } catch (error) {
      return { 
        status: 'FAIL' as const, 
        error: error instanceof Error ? error.message : 'Network error' 
      };
    }
  };

  const runAllTests = async () => {
    setIsLoading(true);
    setTestResults([]);

    const tests = [
      {
        name: 'Database Connection',
        endpoint: '/api/test-db',
        method: 'GET' as const
      },
      {
        name: 'Registration System',
        endpoint: '/api/test-register',
        method: 'POST' as const,
        body: { testType: 'checkTable' }
      },
      {
        name: 'Login System',
        endpoint: '/api/test-login',
        method: 'POST' as const,
        body: { testType: 'checkAuth' }
      }
    ];

    const results: TestResult[] = [];

    for (const test of tests) {
      // Set test as running
      results.push({ name: test.name, status: 'RUNNING' });
      setTestResults([...results]);

      // Run the test
      const result = await runTest(test.name, test.endpoint, test.method, test.body);
      
      // Update result
      const index = results.findIndex(r => r.name === test.name);
      if (index !== -1) {
        results[index] = { ...result, name: test.name };
        setTestResults([...results]);
      }
    }

    setIsLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PASS': return 'text-green-600';
      case 'FAIL': return 'text-red-600';
      case 'RUNNING': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PASS': return '✅';
      case 'FAIL': return '❌';
      case 'RUNNING': return '⏳';
      default: return '❓';
    }
  };

  const passedTests = testResults.filter(r => r.status === 'PASS').length;
  const totalTests = testResults.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">GM</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">GenMatch</h1>
                <p className="text-sm text-gray-600">ระบบทดสอบ</p>
              </div>
            </div>
            <Link 
              href="/"
              className="px-4 py-2 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
            >
              กลับหน้าหลัก
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm border p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              🧪 ระบบทดสอบ GenMatch
            </h2>
            <p className="text-gray-600">
              ทดสอบการเชื่อมต่อและฟังก์ชันต่างๆ ของระบบ
            </p>
          </div>

          {/* Test Controls */}
          <div className="flex justify-center mb-8">
            <button
              onClick={runAllTests}
              disabled={isLoading}
              className="px-8 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'กำลังทดสอบ...' : '🚀 เริ่มทดสอบทั้งหมด'}
            </button>
          </div>

          {/* Test Summary */}
          {totalTests > 0 && (
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 สรุปผลการทดสอบ</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-white rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600">{passedTests}</div>
                  <div className="text-sm text-gray-600">ผ่าน</div>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="text-2xl font-bold text-red-600">{totalTests - passedTests}</div>
                  <div className="text-sm text-gray-600">ไม่ผ่าน</div>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-600">{totalTests}</div>
                  <div className="text-sm text-gray-600">ทั้งหมด</div>
                </div>
              </div>
            </div>
          )}

          {/* Test Results */}
          {testResults.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">🔍 ผลการทดสอบ</h3>
              
              {testResults.map((result, index) => (
                <div key={index} className="border rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">
                      {result.name}
                    </h4>
                    <div className="flex items-center space-x-2">
                      <span className={getStatusColor(result.status)}>
                        {getStatusIcon(result.status)}
                      </span>
                      <span className={`font-semibold ${getStatusColor(result.status)}`}>
                        {result.status}
                      </span>
                    </div>
                  </div>

                  {result.status === 'PASS' && result.result && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <pre className="text-sm text-green-800 overflow-x-auto">
                        {JSON.stringify(result.result, null, 2)}
                      </pre>
                    </div>
                  )}

                  {result.status === 'FAIL' && result.error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-red-800">{result.error}</p>
                    </div>
                  )}

                  {result.status === 'RUNNING' && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-blue-800">กำลังทดสอบ...</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Instructions */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">📋 คำแนะนำการทดสอบ</h3>
            <div className="text-blue-800 space-y-2">
              <p>1. กดปุ่ม "เริ่มทดสอบทั้งหมด" เพื่อทดสอบระบบ</p>
              <p>2. ระบบจะทดสอบการเชื่อมต่อ Database และ API ต่างๆ</p>
              <p>3. หากทดสอบผ่านทั้งหมด แสดงว่าระบบพร้อมใช้งาน</p>
              <p>4. หากมีข้อผิดพลาด ให้ตรวจสอบการเชื่อมต่อและลองใหม่อีกครั้ง</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
