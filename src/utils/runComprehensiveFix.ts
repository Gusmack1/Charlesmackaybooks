// Comprehensive Website Fix Runner
// Executes all phases and addresses remaining TODO items

import { ComprehensiveWebsiteFixer } from './comprehensiveWebsiteFixer';
import { MultiAgentAuditor } from './multiAgentAudit';
import { FinalQualityAssurance } from './finalQualityAssurance';
import { CrossLinkingSystem } from './crossLinkingSystem';
import { MultiAgentTaskBreakdown } from './multiAgentTaskBreakdown';

export async function runCompleteWebsiteFix() {
  console.log('🚀 Starting Complete Website Fix Process...');
  
  const fixer = new ComprehensiveWebsiteFixer();
  const auditor = new MultiAgentAuditor();
  const qa = new FinalQualityAssurance();
  const crossLinker = new CrossLinkingSystem();
  const taskBreakdown = new MultiAgentTaskBreakdown();

  try {
    // Phase 1: Run Comprehensive Website Fixer
    console.log('📋 Phase 1: Running Comprehensive Website Fixer...');
    const fixReport = await fixer.runComprehensiveFix();
    console.log('✅ Comprehensive Fix Complete:', fixReport.summary);

    // Phase 2: Run Multi-Agent Audit
    console.log('🔍 Phase 2: Running Multi-Agent Website Audit...');
    const auditReport = await auditor.runFullAudit();
    console.log('✅ Multi-Agent Audit Complete:', auditReport.summary);

    // Phase 3: Run Final Quality Assurance
    console.log('✅ Phase 3: Running Final Quality Assurance...');
    const qaReport = await qa.runCompleteQA();
    console.log('✅ Quality Assurance Complete:', qaReport.summary);

    // Phase 4: Run Cross-Linking System
    console.log('🔗 Phase 4: Running Cross-Linking System...');
    const crossLinkReport = await crossLinker.runCompleteCrossLinking();
    console.log('✅ Cross-Linking Complete:', crossLinkReport.summary);

    // Phase 5: Run Task Breakdown
    console.log('📊 Phase 5: Running Multi-Agent Task Breakdown...');
    const taskReport = await taskBreakdown.runCompleteTaskBreakdown();
    console.log('✅ Task Breakdown Complete:', taskReport.summary);

    // Generate Final Report
    const finalReport = {
      timestamp: new Date(),
      comprehensiveFix: fixReport,
      multiAgentAudit: auditReport,
      qualityAssurance: qaReport,
      crossLinking: crossLinkReport,
      taskBreakdown: taskReport,
      overallStatus: 'completed',
      totalIssuesFound: fixReport.summary.totalIssuesFound + auditReport.summary.totalIssuesFound,
      totalIssuesFixed: fixReport.summary.totalIssuesFixed + auditReport.summary.totalIssuesFixed,
      recommendations: [
        ...fixReport.phases.flatMap(p => p.recommendations),
        ...auditReport.recommendations,
        ...qaReport.recommendations,
        ...crossLinkReport.recommendations,
        ...taskReport.recommendations
      ],
      criticalActions: [
        ...fixReport.summary.criticalActions,
        ...auditReport.criticalActions,
        ...qaReport.criticalActions,
        ...crossLinkReport.criticalActions,
        ...taskReport.criticalActions
      ]
    };

    console.log('🎉 Complete Website Fix Process Finished!');
    console.log('📊 Final Report:', finalReport);

    return finalReport;

  } catch (error) {
    console.error('❌ Complete Website Fix Process Failed:', error);
    throw error;
  }
}

// Export for use in components
export { runCompleteWebsiteFix }; 