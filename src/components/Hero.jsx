import { Col, Row} from "react-bootstrap"
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom'
function Hero(props) {
     // eslint-disable-next-line no-unused-vars
     const {search, setSearch}  = props
  return (
    <div className='middle-container'>
    <h1 className="text-center">TODO LIST</h1>
    <Row>
        <Col lg='3' >
            <Link to='/todo' className="btn btn-primary">Add Task</Link>
        </Col>
        <Col lg='6' >
        </Col>
        <Col lg='3'>
        <Form.Select aria-label="search" value={search} onChange={(e)=> setSearch(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="complete">Complete</option>
            <option value="all">All</option>
        </Form.Select>
        </Col>
    </Row>
</div>
  )
}

export default Hero