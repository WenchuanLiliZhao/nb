import EpubViewer from './Components/Epub/0_EpubViewer';

// Main Component
const App: React.FC = () => {

  return (
    <div>
      <EpubViewer bookUrl='https://s3.amazonaws.com/moby-dick/moby-dick.epub'/>
    </div>
  );
};

export default App;
