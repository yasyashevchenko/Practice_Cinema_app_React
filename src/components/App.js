import React, { useState, useEffect } from "react";
import { Layout, Spin } from 'antd';
import { LoadingOutlined } from "@ant-design/icons";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { HomePage } from "./pages/home";
import { MoviePage } from "./pages/movie";
import { getMovies } from "../actions/movies";

const { Content } = Layout;
const spinner = <LoadingOutlined spin style={{ fontSize: '92px' }} />;

function App() {
    const [collapsed, toggleCollapsed] = useState(false);
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.isLoading);

    useEffect(() => {
        dispatch(getMovies());
    }, [dispatch]);

    return (
        <Layout>
            <Sidebar collapsed={collapsed}/>
            <Layout className="site-layout">
                <Header collapsed={collapsed} onToggle={toggleCollapsed}/>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280
                    }}
                >
                    {
                        isLoading ? (
                            <div className="spinner-wrapper">
                                <Spin indicator={spinner} />
                            </div>
                        ) : (
                            <Switch>
                                <Route path="/" exact component={HomePage} />
                                <Route path="/movie/:id" component={MoviePage} />
                            </Switch>
                        )
                    }
                </Content>
            </Layout>
        </Layout>
  );
}

export default App;
