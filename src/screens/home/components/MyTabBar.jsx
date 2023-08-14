import React, {useState} from 'react';
import AllContent from './AllContent';
import YoutubeContent from './YoutubeContent';
import FacebookContent from './FacebookContent';
import { Tabs, Tab } from '@material-ui/core';


const MyTabBar = () => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };
    const renderTabContent = (tabIndex) => {
        switch (tabIndex) {
          case 0:
            return  <AllContent/>;
          case 1:
            return <YoutubeContent />;
          case 2:
            return <FacebookContent />;
          default:
            return null;
        }
      };
    return (
        <>
        <Tabs value={activeTab} onChange={handleTabChange} >
        <Tab label="All" style={{ color: activeTab === 0 ? 'rgb(246 91 102)' : '#000000' , fontSize: '1rem', fontWeight: 'bold' }} />
        <Tab label="Youtube" style={{ color: activeTab === 1 ? 'rgb(246 91 102)' : '#000000' , fontSize: '1rem', fontWeight: 'bold' }} />
        <Tab label="DailyMotion" style={{ color: activeTab === 2 ? 'rgb(246 91 102)' : '#000000', fontSize: '1rem', fontWeight: 'bold' }} />
      </Tabs>
      {renderTabContent(activeTab)}
      </>
    );
}

export default MyTabBar;