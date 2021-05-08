import React, { Component } from "react";
import "./dashboardstyle.css";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { baseAPI } from "../config/api_strings";
import { Card, Avatar, Skeleton, Button } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";

const { Meta } = Card;
const style = {
  height: 50,
  border: "1px solid green",
  margin: 6,
  padding: 8,
};

const dummyData = [
  {
    image: "https://picsum.photos/id/0/5616/3744",
    userName: "SampleUSer",
  },
  {
    image: "https://picsum.photos/id/1/5616/3744",
    userName: "SampleUSer",
  },

  {
    image: "https://picsum.photos/id/10/2500/1667",
    userName: "SampleUSer",
  },

  {
    image: "https://picsum.photos/id/100/2500/1656",
    userName: "SampleUSer",
  },
  {
    image: "https://picsum.photos/id/1000/5626/3635",
    userName: "SampleUSer",
  },
  {
    image: "https://picsum.photos/id/1001/5616/3744",
    userName: "SampleUSer",
  },
  {
    image: "https://picsum.photos/id/1002/4312/2868",
    userName: "SampleUSer",
  },
  {
    image: "https://picsum.photos/id/1003/1181/1772",
    userName: "SampleUSer",
  },
  {
    image: "https://picsum.photos/id/1004/5616/3744",
    userName: "SampleUSer",
  },
  {
    image: "https://picsum.photos/id/1005/5760/3840",
    userName: "SampleUSer",
  },

  {
    image: "https://picsum.photos/id/1006/3000/2000",
    userName: "SampleUSer",
  },
  {
    image: "https://picsum.photos/id/1008/5616/3744",
    userName: "SampleUSer",
  },
  {
    image: "https://picsum.photos/id/1009/5000/7502",
    userName: "SampleUSer",
  },
  {
    image: "https://picsum.photos/id/101/2621/1747",
    userName: "SampleUSer",
  },
  {
    image: "https://picsum.photos/id/1010/5184/3456",
    userName: "SampleUSer",
  },

  {
    image: "https://picsum.photos/id/1011/5472/3648",
    userName: "SampleUSer",
  },
  {
    image: "https://picsum.photos/id/1012/3973/2639",
    userName: "SampleUSer",
  },
  {
    image: "https://picsum.photos/id/1013/4256/2832",
    userName: "SampleUSer",
  },
  {
    image: "https://picsum.photos/id/1014/6016/4000",
    userName: "SampleUSer",
  },
  {
    image: "https://picsum.photos/id/1015/6000/4000",
    userName: "SampleUSer",
  },
  {
    image: "https://picsum.photos/id/1016/3844/2563",
    userName: "SampleUSer",
  },
  {
    image: "https://picsum.photos/id/1018/3914/2935",
    userName: "SampleUSer",
  },
  {
    image: "https://picsum.photos/id/1019/5472/3648",
    userName: "SampleUSer",
  },

  {
    image: "https://picsum.photos/id/102/4320/3240",
    userName: "SampleUSer",
  },
  {
    image: "https://picsum.photos/id/1020/4288/2848",
    userName: "SampleUSer",
  },
  {
    image: "https://picsum.photos/id/1021/2048/1206",
    userName: "SampleUSer",
  },
  {
    image: "https://picsum.photos/id/1022/6000/3376",
    userName: "SampleUSer",
  },
];
class Dashboard extends Component {
  state = {
    currentOffset: 2,
    currentData: [],
    loading: true,
    redirectionCorrect: false,
    loadingMessage: "...Loading Contacts",
    fetching: false,
    hasMore: true,
  };
  componentDidMount = () => {
    // console.log("dummy star", dummyData.length);

    let newcurrentData = dummyData.slice(0, 2);
    this.setState({ currentData: newcurrentData });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
  };
  inputHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  fetchMoreData = () => {
    if (this.state.currentData.length >= 26 || this.state.currentOffset >= 30) {
      this.setState({ hasMore: false, loadingMessage: "That's All Folks" });
      return;
    }
    this.setState({ loading: true });

    setTimeout(() => {
      let slicedData = dummyData.slice(
        this.state.currentOffset,
        this.state.currentOffset + 2
      );
      // console.log("current offset", this.state.currentOffset, slicedData);
      let newData = [...this.state.currentData, ...slicedData];
      this.setState({
        currentData: newData,
        currentOffset: this.state.currentOffset + 2,
      });
      this.setState({ loading: false });

      // console.log("currentdata", newData);
    }, 2000);
  };
  redirection = () => {
    let localData = localStorage.getItem("User");
    // console.log("localdata", typeof localData);
    if (!localData) {
      return <Redirect to="/" />;
    }
    if (localData) {
      let finalData = JSON.parse(localData);

      if (finalData.username !== "foo" && finalData.password !== "bar") {
        // console.log("skajak");
        return <Redirect to="/" />;
      }
    }
  };
  logout = () => {
    localStorage.removeItem("User");
    this.setState({ redirectionCorrect: true });
  };
  render() {
    return (
      <div>
        {this.redirection()}
        {this.state.redirectionCorrect && this.redirection()}
        <div class="container animate">
          <div class="row" style={{ marginTop: "100px" }}>
            <div
              class="col-sm col-lg text-center"
              style={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                alignContent: "space-around",
              }}
            >
              <h2>Infinite Scroll List Assignment </h2>
              <Button onClick={this.logout}>Logout</Button>
              <br />

              <InfiniteScroll
                style={{ padding: "24px" }}
                dataLength={this.state.currentData.length}
                next={this.fetchMoreData}
                hasMore={this.state.hasMore}
                loader={<h4>{this.state.loadingMessage}</h4>}
                endMessage={
                  <h3 style={{ textAlign: "center" }}>
                    <b>That's All Folks </b>
                  </h3>
                }
              >
                {this.state.currentData.map((i) => {
                  return (
                    <div style={{ marginBottom: "10px" }}>
                      <Card
                        class="animate"
                        loading={this.state.loading}
                        hoverable
                        style={{
                          width: 240,
                          boxShadow: "0 3px 26px ",
                        }}
                        cover={<img alt="example" src={i.image} />}
                      >
                        <Meta title={i.name} description="www.instagram.com" />
                      </Card>
                      {/* <Skeleton loading={this.state.loading} avatar active>
                        <Meta
                          avatar={<Avatar src={i.image} />}
                          title={i.name}
                          description="This is the description"
                        />
                      </Skeleton> */}
                    </div>
                  );
                })}
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
