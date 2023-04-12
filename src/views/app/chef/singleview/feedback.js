import React, { useState } from "react";
import { Row, Card, CardBody,Button } from "reactstrap";
import { Colxx } from "components/common/CustomBootstrap";
import Deletealert from "../../elements/Deletealert";
import IntlMessages from "helpers/IntlMessages";
import Addmodal from "./feedback/Addmodal";
import api from "helpers/api";
import * as axiosURLS from "helpers/endpoints";
import Rating from "components/common/Rating";
import friendsData from "data/follow";
const Feedback = ({ feedbacks }) => {
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const deleteSelected = async (res) => {
    setIsLoading(true);
    if (res) {
      try {
        await Promise.all(
          selectedItems.map(async (item) => {
            await api.delete(axiosURLS.FEEDBACK + "/" + item);
          })
        );
        setSelectedItems([]);
        fetchData();
        NotificationManager.success("Menu Deleted successfully", "Deleted", 3000, null, null, "");
      } catch (err) {
        console.log(err);
        console.log(err.response);
        if (err.response) {
          NotificationManager.error(err.response.data.message, "Error occured", 3000, null, null, "");
        }
      }
    }
    setIsLoading(false);
  };
  return (
    <>
      <Row>
      <div className="text-zero top-right-button-container">
            <Button
              color="primary"
              size="lg"
              className="top-right-button"
              onClick={() => {
                setModalOpen(!modalOpen);
              }}
            >
              <IntlMessages id="pages.add-new" />
            </Button>
          </div>
        {feedbacks?.map((itemData, index) => {
          return (
            <Colxx key={`feedback_${index}`} xxs="12">
              <Card className="card d-flex mb-3">
                <div className="d-flex flex-grow-1 min-width-zero">
                  <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                    <Row className="w-100">
                      <Colxx xss="12" md="2">
                        {itemData?.from ? itemData.from : "NA"}
                      </Colxx>
                      <Colxx xss="12" md="2">
                        {itemData.title}
                      </Colxx>
                      <Colxx xss="12" md="2">
                        {itemData.rating} / 5
                      </Colxx>
                      <Colxx xss="12" md="4">
                        {itemData.description}
                      </Colxx>
                    </Row>
                  </CardBody>
                </div>
              </Card>
            </Colxx>
          );
        })}
      </Row>
      <Addmodal fetchData={feedbacks} modalOpen={modalOpen} toggleModal={() => setModalOpen(!modalOpen)} />
      <Deletealert modalOpen={deleteAlert} toggleModal={() => setDeleteAlert(!deleteAlert)} setSureDelete={deleteSelected} />
    </>
  );
};

export default Feedback;
