import React from "react";
import { Button, Container } from "react-bootstrap";
import EditBox from "../Editbox/Editbox";
const Profile = () => {
  return (
    <Container>
      <div>Salve, qui puoi modificare i tuoi dati</div>
      <div className="row">
        <form encType="multipart/form-data" className="d-flex flex-column gap-2 col-lg-4">
          <EditBox name={"name"} type={"text"} ph={"Name"} label={"Name"} />
          <EditBox name={"surname"} type={"text"} ph={"Surname"} label={"Surname"} />
          <input name="imgUpload" type="file" className="form-control" />
          <Button variant="outline-primary" type="submit">
            Send
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Profile;
