import React from "react";
import { Grid, List } from "semantic-ui-react";
import { IActivity } from "../../../app/models/Activity";
import ActivityList from "./ActivityList";

interface IProps {
  activities: IActivity[];
}

const ActivityDashboard: React.FC<IProps> = ({ activities }) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        {/* <List>
          {activities.map(activity => (
            <List.Item key={activity.id}>{activity.title}Hello</List.Item>
          ))}
        </List> */}
        <ActivityList activities={activities} />
      </Grid.Column>
    </Grid>
  );
};

export default ActivityDashboard;
