import React, { useState, useEffect } from "react";
import axios from "axios";
import { Header, Icon, List } from "semantic-ui-react";
import "./styles.css";
import { IActivity } from "../models/Activity";

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);

  useEffect(() => {
    axios
      .get<IActivity[]>("http://localhost:5000/api/activities")
      .then(response => {
        setActivities(response.data);
      });
  }, []);

  return (
    <List>
      <Header as="h2">
        <Icon name="users" />
        <Header.Content>Reactivities</Header.Content>
      </Header>
      <List>
        {activities.map(activity => (
          <List.Item key={activity.id}>{activity.title}</List.Item>
        ))}
      </List>
    </List>
  );
};

export default App;
