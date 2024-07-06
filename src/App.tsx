import React, { useState, ReactElement } from 'react';
import Test from './Components/Test';
import EpubViewer from './Components/Epub/EpubViewer';

// Main Component
const App: React.FC = () => {
  // 状态用来管理可以渲染的 Test 组件的数量
  const [testComponents, setTestComponents] = useState<ReactElement[]>([]);

  // 处理按钮点击事件，增加 Test 组件
  function addTestComponent() {
    setTestComponents([...testComponents, <Test key={testComponents.length}/>]);
  }

  return (
    <div>
      <h1>Dynamic Test Components</h1>
      <button onClick={addTestComponent}>Add Test Component</button>
      {testComponents}

      <EpubViewer />
    </div>
  );
};

export default App;
