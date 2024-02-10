import React, {useState} from "react"; 
import { Select, Typography, Row, Col, Avatar, Card} from 'antd';
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/CryptoApi";
import Loader from "./Loader";

const {Text, Title} = Typography;
const {Option} = Select;

const News = ({ simplified }) => {
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
    const { data: cryptoNews, isLoading } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 5 : 10 });
    const {data} = useGetCryptosQuery(100)

    // Check if data is still loading
    if (isLoading) return <div><Loader /></div>;

    // Check if cryptoNews is null or undefined
    if (!cryptoNews) return <div>No news available</div>;

    return (
       <Row gutter={[24, 24]}>
           {!simplified && (
               <Col span={24}>
                   <Select
                       showSearch
                       className="select-news"
                       placeholder="Select a Crypto"
                       optionFilterProp="children"
                       onChange={(value) => setNewsCategory(value)}
                       filterOption={(input, option) => option.children.toLowerCase().inexOf(input.toLowerCase()) >=0}
                   >
                       <Option value="Cryptocurrency">Cryptocurrency</Option>
                       {data?.data?.coins.map((coin) => <Option value={coin.name}>{coin.name}</Option>)}

                   </Select>
               </Col>
           )}
           {cryptoNews.map((news, i) => ( // Access cryptoNews directly
                <Col xs={24} sm={12} lg={8} key={i}>
                    <Card hoverable className="news-card">
                        <a href={news.url} target="_blank" rel="noreferrer">
                            <div className="news-image-container">
                                <Title className="news-title" level={4}>{news.title}</Title>
                            </div>
                            <div dangerouslySetInnerHTML={{ __html: news.description }} />
                        </a>
                    </Card>
                </Col>
           ))}
       </Row>
    )
}


  
export default News