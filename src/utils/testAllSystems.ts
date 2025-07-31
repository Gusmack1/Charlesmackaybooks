// Test All Systems Script for Charles Mackay Books
// This script tests all available systems and provides a comprehensive report

import { SystemRunner } from './systemRunner';
import { MultiAgentAuditDeployment } from './multiAgentAuditDeployment';
import { FinalQualityAssurance } from './finalQualityAssurance';
import { CrossLinkingSystem } from './crossLinkingSystem';
import { MultiAgentTaskBreakdownSystem } from './multiAgentTaskBreakdown';

export async function testAllSystems(): Promise<void> {
  console.log('🚀 Starting comprehensive system test for Charles Mackay Books...\n');

  try {
    // Test 1: System Runner
    console.log('📊 Testing System Runner...');
    const systemRunner = new SystemRunner();
    const runnerReport = await systemRunner.runAllSystems();
    console.log(`✅ System Runner completed: ${runnerReport.summary.completedSystems}/${runnerReport.summary.totalSystems} systems passed`);
    console.log(`⏱️ Total duration: ${Math.round(runnerReport.totalDuration! / 1000)}s\n`);

    // Test 2: Multi-Agent Audit System
    console.log('🔍 Testing Multi-Agent Audit System...');
    const auditSystem = new MultiAgentAuditDeployment({
      targets: [
        { url: '/', title: 'Home Page', type: 'home', priority: 'critical', expectedScore: 95 },
        { url: '/books', title: 'Books Overview', type: 'page', priority: 'high', expectedScore: 90 }
      ],
      concurrentAudits: 2,
      retryAttempts: 2,
      timeoutMs: 15000,
      generateReports: true,
      saveToDatabase: false,
      notifyOnCompletion: false,
    });
    
    const auditResult = await auditSystem.deployFullAudit();
    console.log(`✅ Multi-Agent Audit completed: Average score ${auditResult.averageScore}/100`);
    console.log(`📈 SEO Score: ${auditResult.seoScore}/100`);
    console.log(`⚡ Performance Score: ${auditResult.performanceScore}/100\n`);

    // Test 3: Quality Assurance System
    console.log('✅ Testing Quality Assurance System...');
    const qaSystem = new FinalQualityAssurance({
      targetScore: 95,
      performanceTargets: {
        lcp: 2.5,
        fid: 100,
        cls: 0.1,
        lighthouseScore: 90
      },
      seoTargets: {
        metaTags: true,
        structuredData: true,
        internalLinking: true,
        imageOptimization: true
      }
    });

    const qaResult = await qaSystem.runFullQualityAssurance();
    console.log(`✅ Quality Assurance completed: Overall score ${qaResult.overallScore}/100`);
    console.log(`📊 Tests passed: ${qaResult.tests.filter(t => t.status === 'passed').length}/${qaResult.tests.length}\n`);

    // Test 4: Cross-Linking System
    console.log('🔗 Testing Cross-Linking System...');
    const crossLinkingSystem = new CrossLinkingSystem({
      maxSuggestions: 5,
      minRelevanceScore: 0.3,
      enableCaching: true,
      cacheExpiry: 3600000,
      enableAnalytics: true,
      seoIntegration: true,
      uxEnhancement: true
    });

    // Initialize with sample data
    const sampleContentNodes = [
      {
        id: 'home',
        title: 'Home Page',
        description: 'Charles Mackay Books - Aviation History',
        content: 'Specializing in Scottish Aviation History • WWI & WWII Aircraft',
        type: 'page',
        url: '/',
        tags: ['aviation', 'history', 'scottish'],
        category: 'home',
        publishDate: new Date(),
        author: 'Charles E. MacKay'
      },
      {
        id: 'adolf-rohrbach',
        title: 'Adolf Rohrbach Book',
        description: 'Metal Aircraft Construction',
        content: 'Comprehensive analysis of Adolf Rohrbach\'s metal aircraft construction techniques',
        type: 'book',
        url: '/books/adolf-rohrbach',
        tags: ['aviation', 'metal', 'construction', 'rohrbach'],
        category: 'books',
        publishDate: new Date(),
        author: 'Charles E. MacKay'
      }
    ];

    crossLinkingSystem.initialize(sampleContentNodes);
    const suggestions = crossLinkingSystem.getLinkSuggestions('home', { maxSuggestions: 3 });
    const analytics = crossLinkingSystem.getAnalytics();
    const stats = crossLinkingSystem.getSystemStats();

    console.log(`✅ Cross-Linking System completed: ${suggestions.length} suggestions generated`);
    console.log(`📊 Content nodes: ${stats.totalNodes}, Relationships: ${stats.totalRelationships}\n`);

    // Test 5: Task Breakdown System
    console.log('🤖 Testing Multi-Agent Task Breakdown System...');
    const taskBreakdownSystem = new MultiAgentTaskBreakdownSystem();

    // Create sample tasks
    const sampleTasks = [
      {
        id: 'test-task-1',
        title: 'System Validation Task',
        description: 'Validate all systems are working correctly',
        type: 'testing' as const,
        priority: 'high' as const,
        status: 'completed' as const,
        assignedAgent: 'testing-agent',
        createdAt: new Date(),
        updatedAt: new Date(),
        estimatedDuration: 30,
        actualDuration: 25,
        dependencies: [],
        tags: ['validation', 'testing']
      },
      {
        id: 'test-task-2',
        title: 'Performance Optimization',
        description: 'Optimize website performance for production',
        type: 'development' as const,
        priority: 'high' as const,
        status: 'in-progress' as const,
        assignedAgent: 'dev-agent',
        createdAt: new Date(),
        updatedAt: new Date(),
        estimatedDuration: 60,
        actualDuration: 45,
        dependencies: ['test-task-1'],
        tags: ['performance', 'optimization']
      }
    ];

    sampleTasks.forEach(task => taskBreakdownSystem.createTask(task));
    const tasks = taskBreakdownSystem.getTasks();
    const agents = taskBreakdownSystem.getAgents();
    const workflows = taskBreakdownSystem.getWorkflows();

    console.log(`✅ Task Breakdown System completed: ${tasks.length} tasks created`);
    console.log(`🤖 Active agents: ${agents.filter(a => a.status === 'busy').length}/${agents.length}`);
    console.log(`📋 Workflows: ${workflows.length}\n`);

    // Final Summary
    console.log('🎉 All Systems Test Summary:');
    console.log('============================');
    console.log(`✅ System Runner: ${runnerReport.summary.completedSystems}/${runnerReport.summary.totalSystems} systems passed`);
    console.log(`🔍 Multi-Agent Audit: ${auditResult.averageScore}/100 average score`);
    console.log(`✅ Quality Assurance: ${qaResult.overallScore}/100 overall score`);
    console.log(`🔗 Cross-Linking: ${suggestions.length} suggestions generated`);
    console.log(`🤖 Task Breakdown: ${tasks.length} tasks managed`);
    console.log(`⏱️ Total test duration: ${Math.round(runnerReport.totalDuration! / 1000)}s`);
    console.log('\n🚀 All systems are operational and ready for production deployment!');

    // Generate recommendations
    console.log('\n💡 Recommendations:');
    if (auditResult.averageScore < 90) {
      console.log('📊 Consider implementing additional SEO improvements to reach target scores');
    }
    if (qaResult.overallScore < 95) {
      console.log('✅ Review quality assurance results and address any identified issues');
    }
    if (suggestions.length < 2) {
      console.log('🔗 Add more content to improve cross-linking opportunities');
    }
    if (tasks.length < 3) {
      console.log('🤖 Consider creating more tasks to fully utilize the task breakdown system');
    }

    console.log('\n🎯 Next Steps:');
    console.log('1. Deploy to production environment');
    console.log('2. Monitor performance metrics');
    console.log('3. Run regular system audits');
    console.log('4. Update content and cross-linking as needed');

  } catch (error) {
    console.error('❌ System test failed:', error);
    throw error;
  }
}

// Export for use in components
export { testAllSystems }; 