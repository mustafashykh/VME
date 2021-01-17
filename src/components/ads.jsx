import React, { Component } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./common/pagination";
import AdCard from "./common/adCard";
import PopupBox from "./common/popupBox";
import car from "../images/car.jpg";
import car2 from "../images/car2.jpg";
import car3 from "../images/lambo.jpg";
import car4 from "../images/new car.jpg";
class Ads extends Component {
  state = {
    ads: [],
    currentPage: 1,
    pageSize: 8,
    editAble: false,
    display: false,
    data: "",
  };

  componentDidMount() {
    const ads = [
      {
        Id: 1,
        img: car,
        price: "10,000$",
        name: "Mercedes",
        color: "white",
        model: "benz",
        licensePlate: "LZX-9171",
        details:
          "Some quick example text to build on the card title and make up the bulk of the card's content.",
      },
      {
        Id: 2,
        img: car2,
        price: "50,000$",
        name: "Lambo",
        color: "white",
        model: "benz",
        licensePlate: "LZX-9171",
        details:
          "Some quick example text to build on the card title and make up the bulk of the card's content.",
      },
      {
        Id: 3,
        img: car3,
        price: "24,000$",
        name: "Lamborghini",
        color: "white",
        model: "benz",
        licensePlate: "LZX-9171",
        details:
          "Some quick example text to build on the card title and make up the bulk of the card's content.",
      },
      {
        Id: 4,
        img: car4,
        price: "1700$",
        name: "Spyder",
        color: "white",
        model: "benz",
        licensePlate: "LZX-9171",
        details:
          "Some quick example text to build on the card title and make up the bulk of the card's content.",
      },
      {
        Id: 5,
        img: car4,
        price: "1700$",
        name: "Spyder",
        color: "white",
        model: "benz",
        licensePlate: "LZX-9171",
        details:
          "Some quick example text to build on the card title and make up the bulk of the card's content.",
      },
      {
        Id: 6,
        img: car4,
        price: "1700$",
        name: "Spyder",
        color: "white",
        model: "benz",
        licensePlate: "LZX-9171",
        details:
          "Some quick example text to build on the card title and make up the bulk of the card's content.",
      },
      {
        Id: 7,
        img: car4,
        price: "1700$",
        name: "Spyder",
        color: "white",
        model: "benz",
        licensePlate: "LZX-9171",
        details:
          "Some quick example text to build on the card title and make up the bulk of the card's content.",
      },
    ];
    this.setState({ ads });
  }

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.renderPopupBox = this.renderPopupBox.bind(this);
  }

  getPagedData = () => {
    const { ads: allAds, pageSize, currentPage } = this.state;

    const ads = paginate(allAds, currentPage, pageSize);
    return { ads };
  };

  executeScroll = () => this.myRef.current.scrollIntoView();

  handlePageChange = (page) => {
    this.executeScroll();
    this.setState({ currentPage: page });
  };

  handleDelete = (data) => {
    const ads = this.state.ads.filter((ad) => ad.Id !== data.Id);
    const display = false;
    this.setState({ ads, display });
  };

  handleEdit = () => {
    let editAble = this.state.editAble;
    editAble = editAble === true ? false : true;
    this.setState({ editAble });
  };

  renderPopupBox = (data) => {
    const display = true;
    this.setState({ display, data });
  };

  handleCancel = () => {
    const display = false;
    this.setState({ display });
  };

  render() {
    const { ads } = this.getPagedData();
    const { length: count } = this.state.ads;
    const { pageSize, currentPage, editAble } = this.state;
    const totalPages = Math.ceil(count / pageSize);
    if (count === 0) return <p>There are no ads in database</p>;
    return (
      <React.Fragment>
        {this.state.display && (
          <PopupBox
            onCancel={this.handleCancel}
            data={this.state.data}
            onDelete={this.handleDelete}
            label={"Car"}
          />
        )}
        <div className="container" ref={this.myRef}>
          <div className="row">
            <div className="col-sm-3">
              <strong>
                <h4 style={{ paddingLeft: "5px", paddingTop: "10px" }}>
                  Showing all {count} ads:
                </h4>
              </strong>
            </div>

            <div
              className="col-sm-2 offset-sm-7"
              style={{ paddingTop: "10px" }}
            >
              <strong>
                <p style={{ fontSize: "20px" }}>
                  Page: {currentPage}/{totalPages}
                </p>
              </strong>
            </div>
          </div>
          {!editAble && (
            <button className="btn btn-danger" onClick={this.handleEdit}>
              <i className="fa fa-pencil-square-o" aria-hidden="true"></i> Edit
            </button>
          )}
          {editAble && (
            <button className="btn btn-success" onClick={this.handleEdit}>
              <i className="fa fa-check" aria-hidden="true"></i> Done
            </button>
          )}
          <div className="row">
            {ads.map((ad) => (
              <div
                className="col-sm-3"
                key={ad.Id}
                style={{ paddingTop: "10px" }}
              >
                <AdCard
                  data={ad}
                  onDelete={this.renderPopupBox}
                  editProperty={editAble}
                />
              </div>
            ))}
          </div>
          <div
            style={{
              paddingLeft: "510px",
              paddingTop: "20px",
              marginBottom: "50px",
            }}
          >
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Ads;
