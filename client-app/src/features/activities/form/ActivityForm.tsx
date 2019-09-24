import React, { useState, FormEvent, useContext } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/Activity";
import { v4 as uuid } from "uuid";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";

interface IProps {
  activity: IActivity;
}

const ActivityForm: React.FC<IProps> = ({
  activity: initialFormState
}) => {

  const activityStore = useContext(ActivityStore)
  const {createActivity, editActivity, submitting, cancelFormOpen} = activityStore

  const initializedForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        id: "",
        title: "",
        category: "",
        description: "",
        date: "",
        city: "",
        venue: ""
      };
    }
  };

  const [activity, setActivity] = useState<IActivity>(initializedForm);

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({
      ...activity,
      [name]: value
    });
  };

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid()
      };
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          name="title"
          onChange={event => handleInputChange(event)}
          placeholder="Title"
          value={activity.title}
        />
        <Form.TextArea
          name="description"
          onChange={event => handleInputChange(event)}
          rows={2}
          placeholder="Description"
          value={activity.description}
        />
        <Form.Input
          name="category"
          onChange={event => handleInputChange(event)}
          placeholder="Category"
          value={activity.category}
        />
        <Form.Input
          name="date"
          onChange={event => handleInputChange(event)}
          type="datetime-local"
          placeholder="Date"
          value={activity.date}
        />
        <Form.Input
          name="city"
          onChange={event => handleInputChange(event)}
          placeholder="City"
          value={activity.city}
        />
        <Form.Input
          name="venue"
          onChange={event => handleInputChange(event)}
          placeholder="Venue"
          value={activity.venue}
        />
        <Button
          loading={submitting}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          onClick={cancelFormOpen}
          floated="right"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);
