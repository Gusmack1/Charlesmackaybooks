'use client';

import { useState, useMemo } from 'react';
import { 
  useMultiAgentTaskBreakdown,
  Task,
  Agent,
  Workflow,
  TaskType,
  Priority,
  TaskStatus,
  AgentType
} from '@/utils/multiAgentTaskBreakdown';

interface MultiAgentTaskBreakdownProps {
  className?: string;
  showAgents?: boolean;
  showWorkflows?: boolean;
  showAnalytics?: boolean;
}

export default function MultiAgentTaskBreakdown({
  className = '',
  showAgents = true,
  showWorkflows = true,
  showAnalytics = true
}: MultiAgentTaskBreakdownProps) {
  const {
    tasks,
    agents,
    workflows,
    createTask,
    assignTask,
    updateTaskStatus,
    distributeTasks
  } = useMultiAgentTaskBreakdown();

  const [activeTab, setActiveTab] = useState<'tasks' | 'agents' | 'workflows' | 'analytics'>('tasks');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showCreateTask, setShowCreateTask] = useState(false);

  // ===== ANALYTICS CALCULATIONS =====

  const analytics = useMemo(() => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const inProgressTasks = tasks.filter(t => t.status === 'in_progress').length;
    const pendingTasks = tasks.filter(t => t.status === 'pending').length;
    const blockedTasks = tasks.filter(t => t.status === 'blocked').length;

    const taskCompletionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    const averageTaskDuration = tasks
      .filter(t => t.actualDuration)
      .reduce((acc, t) => acc + (t.actualDuration || 0), 0) / 
      tasks.filter(t => t.actualDuration).length || 0;

    const agentUtilization = agents.map(agent => ({
      ...agent,
      utilization: agent.maxConcurrentTasks > 0 
        ? (agent.currentTasks.length / agent.maxConcurrentTasks) * 100 
        : 0
    }));

    const tasksByType = tasks.reduce((acc, task) => {
      acc[task.type] = (acc[task.type] || 0) + 1;
      return acc;
    }, {} as Record<TaskType, number>);

    const tasksByPriority = tasks.reduce((acc, task) => {
      acc[task.priority] = (acc[task.priority] || 0) + 1;
      return acc;
    }, {} as Record<Priority, number>);

    return {
      totalTasks,
      completedTasks,
      inProgressTasks,
      pendingTasks,
      blockedTasks,
      taskCompletionRate,
      averageTaskDuration,
      agentUtilization,
      tasksByType,
      tasksByPriority
    };
  }, [tasks, agents]);

  // ===== TASK CREATION FORM =====

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    type: 'development' as TaskType,
    priority: 'medium' as Priority,
    estimatedDuration: 60,
    requirements: [''],
    deliverables: [''],
    acceptanceCriteria: [''],
    dependencies: [] as string[]
  });

  const handleCreateTask = () => {
    createTask({
      ...newTask,
      requirements: newTask.requirements.filter(r => r.trim()),
      deliverables: newTask.deliverables.filter(d => d.trim()),
      acceptanceCriteria: newTask.acceptanceCriteria.filter(c => c.trim()),
      metadata: {}
    });

    setNewTask({
      title: '',
      description: '',
      type: 'development',
      priority: 'medium',
      estimatedDuration: 60,
      requirements: [''],
      deliverables: [''],
      acceptanceCriteria: [''],
      dependencies: []
    });
    setShowCreateTask(false);
  };

  // ===== RENDER FUNCTIONS =====

  const renderTaskCard = (task: Task) => {
    const assignedAgent = agents.find(a => a.id === task.assignedAgent);
    
    return (
      <div 
        key={task.id}
        className={`bg-white rounded-lg shadow-md p-4 border-l-4 ${
          task.priority === 'critical' ? 'border-red-500' :
          task.priority === 'high' ? 'border-orange-500' :
          task.priority === 'medium' ? 'border-yellow-500' :
          'border-green-500'
        } ${task.status === 'completed' ? 'opacity-75' : ''}`}
        onClick={() => setSelectedTask(task)}
      >
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900 truncate">{task.title}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            task.status === 'completed' ? 'bg-green-100 text-green-800' :
            task.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
            task.status === 'blocked' ? 'bg-red-100 text-red-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {task.status.replace('_', ' ')}
          </span>
        </div>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
            {task.type}
          </span>
          <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
            {task.estimatedDuration}m
          </span>
          {assignedAgent && (
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
              {assignedAgent.name}
            </span>
          )}
        </div>

        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
          {task.assignedAgent && (
            <span>Assigned: {assignedAgent?.name}</span>
          )}
        </div>
      </div>
    );
  };

  const renderAgentCard = (agent: Agent & { utilization: number }) => {
    return (
      <div key={agent.id} className="bg-white rounded-lg shadow-md p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-semibold text-gray-900">{agent.name}</h3>
            <p className="text-sm text-gray-600">{agent.description}</p>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-blue-600">
              {agent.currentTasks.length}/{agent.maxConcurrentTasks}
            </div>
            <div className="text-xs text-gray-500">Tasks</div>
          </div>
        </div>

        <div className="mb-3">
          <div className="flex justify-between text-sm mb-1">
            <span>Utilization</span>
            <span>{agent.utilization.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                agent.utilization > 80 ? 'bg-red-500' :
                agent.utilization > 60 ? 'bg-yellow-500' :
                'bg-green-500'
              }`}
              style={{ width: `${Math.min(agent.utilization, 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="mb-3">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Capabilities</h4>
          <div className="flex flex-wrap gap-1">
            {agent.capabilities.slice(0, 3).map((capability, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                {capability}
              </span>
            ))}
            {agent.capabilities.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                +{agent.capabilities.length - 3} more
              </span>
            )}
          </div>
        </div>

        <div className="text-xs text-gray-500">
          <div>Tasks Completed: {agent.performance.tasksCompleted}</div>
          <div>Avg Time: {agent.performance.averageCompletionTime.toFixed(0)}m</div>
        </div>
      </div>
    );
  };

  const renderAnalytics = () => {
    return (
      <div className="space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-blue-600">{analytics.totalTasks}</div>
            <div className="text-sm text-gray-600">Total Tasks</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-green-600">{analytics.completedTasks}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-orange-600">{analytics.inProgressTasks}</div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-red-600">{analytics.blockedTasks}</div>
            <div className="text-sm text-gray-600">Blocked</div>
          </div>
        </div>

        {/* Progress Chart */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-4">Task Completion Rate</h3>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>{analytics.taskCompletionRate.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${analytics.taskCompletionRate}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Agent Utilization */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-4">Agent Utilization</h3>
          <div className="space-y-3">
            {analytics.agentUtilization.map(agent => (
              <div key={agent.id} className="flex items-center space-x-3">
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{agent.name}</span>
                    <span>{agent.utilization.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        agent.utilization > 80 ? 'bg-red-500' :
                        agent.utilization > 60 ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(agent.utilization, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`bg-gray-50 min-h-screen ${className}`}>
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Multi-Agent Task Breakdown System
          </h1>
          <p className="text-gray-600">
            Coordinate specialized AI agents for development tasks and quality assurance
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <nav className="flex space-x-8">
            {[
              { id: 'tasks', label: 'Tasks', count: tasks.length },
              { id: 'agents', label: 'Agents', count: agents.length },
              { id: 'workflows', label: 'Workflows', count: workflows.length },
              { id: 'analytics', label: 'Analytics' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                {tab.count !== undefined && (
                  <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Tasks Tab */}
          {activeTab === 'tasks' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Tasks</h2>
                <div className="space-x-2">
                  <button
                    onClick={() => setShowCreateTask(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Create Task
                  </button>
                  <button
                    onClick={distributeTasks}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                  >
                    Distribute Tasks
                  </button>
                </div>
              </div>

              {/* Task Filters */}
              <div className="mb-4 flex flex-wrap gap-2">
                {(['all', 'pending', 'assigned', 'in_progress', 'completed', 'blocked'] as const).map(status => (
                  <button
                    key={status}
                    className={`px-3 py-1 rounded-full text-sm ${
                      status === 'all' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {status.replace('_', ' ')}
                  </button>
                ))}
              </div>

              {/* Task Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tasks.map(renderTaskCard)}
              </div>
            </div>
          )}

          {/* Agents Tab */}
          {activeTab === 'agents' && showAgents && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Agents</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {analytics.agentUtilization.map(renderAgentCard)}
              </div>
            </div>
          )}

          {/* Workflows Tab */}
          {activeTab === 'workflows' && showWorkflows && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Workflows</h2>
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-600">
                  Workflow management interface will be implemented here.
                </p>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && showAnalytics && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Analytics</h2>
              {renderAnalytics()}
            </div>
          )}
        </div>

        {/* Create Task Modal */}
        {showCreateTask && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-semibold mb-4">Create New Task</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter task title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Enter task description"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type
                    </label>
                    <select
                      value={newTask.type}
                      onChange={(e) => setNewTask({ ...newTask, type: e.target.value as TaskType })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="development">Development</option>
                      <option value="design">Design</option>
                      <option value="content">Content</option>
                      <option value="seo">SEO</option>
                      <option value="testing">Testing</option>
                      <option value="deployment">Deployment</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="optimization">Optimization</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Priority
                    </label>
                    <select
                      value={newTask.priority}
                      onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as Priority })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estimated Duration (minutes)
                  </label>
                  <input
                    type="number"
                    value={newTask.estimatedDuration}
                    onChange={(e) => setNewTask({ ...newTask, estimatedDuration: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowCreateTask(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateTask}
                  disabled={!newTask.title.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Task
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Task Detail Modal */}
        {selectedTask && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold">{selectedTask.title}</h3>
                <button
                  onClick={() => setSelectedTask(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-1">Description</h4>
                  <p className="text-gray-600">{selectedTask.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">Type</h4>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                      {selectedTask.type}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">Priority</h4>
                    <span className={`px-2 py-1 rounded text-sm ${
                      selectedTask.priority === 'critical' ? 'bg-red-100 text-red-800' :
                      selectedTask.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                      selectedTask.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {selectedTask.priority}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-1">Status</h4>
                  <select
                    value={selectedTask.status}
                    onChange={(e) => {
                      updateTaskStatus(selectedTask.id, e.target.value as TaskStatus);
                      setSelectedTask(null);
                    }}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="assigned">Assigned</option>
                    <option value="in_progress">In Progress</option>
                    <option value="review">Review</option>
                    <option value="completed">Completed</option>
                    <option value="blocked">Blocked</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                {selectedTask.assignedAgent && (
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">Assigned Agent</h4>
                    <p className="text-gray-600">
                      {agents.find(a => a.id === selectedTask.assignedAgent)?.name}
                    </p>
                  </div>
                )}

                <div>
                  <h4 className="font-medium text-gray-700 mb-1">Requirements</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {selectedTask.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-1">Deliverables</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {selectedTask.deliverables.map((del, index) => (
                      <li key={index}>{del}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 