import React, { useState } from 'react';
import {
  Layout,
  Row,
  Col,
  Card,
  ArrowLeftOutlined,
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Checkbox,
  AutoComplete,
} from 'antd';
import {
  LeftSquareOutlined
} from '@ant-design/icons';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getAllCities } from '../fetcher';

const { Content } = Layout;

// type SizeType = Parameters<typeof Form>[0]['size'];

// const FormSizeDemo = () => {
//   const [componentSize, setComponentSize] = useState < SizeType | 'default' > ('default');
//   const onFormLayoutChange = ({ size }: { size: SizeType }) => {
//     setComponentSize(size);
//   };

const options2 = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];
const { Option } = Select;


const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};


const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    // sm: {
    //   span: 16,
    //   offset: 8,
    // },
  },
};

// const RegistrationForm = () => {
//   const [form] = Form.useForm();

//   const onFinish = (values: any) => {
//     console.log('Received values of form: ', values);
//   };

//   const prefixSelector = (
//     <Form.Item name="prefix" noStyle>
//       <Select style={{ width: 70 }}>
//         <Option value="86">+86</Option>
//         <Option value="87">+87</Option>
//       </Select>
//     </Form.Item>
//   );

//   const suffixSelector = (
//     <Form.Item name="suffix" noStyle>
//       <Select style={{ width: 70 }}>
//         <Option value="USD">$</Option>
//         <Option value="CNY">¥</Option>
//       </Select>
//     </Form.Item>
//   );

//   // const [autoCompleteResult, setAutoCompleteResult] = useState < string[] > ([]);

//   const onWebsiteChange = (value: string) => {
//     if (!value) {
//       setAutoCompleteResult([]);
//     } else {
//       setAutoCompleteResult(['.com', '.org', '.net'].map(domain => `${value}${domain}`));
//     }
//   };

//   const websiteOptions = autoCompleteResult.map(website => ({
//     label: website,
//     value: website,
//   }));





const makeAutoFill = (str) => {
  let arr = str.split(',');
  let state;
  let city = arr[1].toLowerCase();
  if (arr[0] == 'CA') {
    state = 'california';
  } else {
    state = 'british columbia';
  }
  arr = [state, city];
  return arr;
}

const makeOptions = (arr) => {
  if (!Array.isArray(arr)) {
    return [];
  }
  let result = [
    {
      value: 'california',
      label: 'California',
      children: []
    },
    {
      value: 'british columbia',
      label: 'British Columbia',
      children: []
    }];
  arr.forEach(obj => {
    let cityArr = Object.entries(obj);
    let cityObj = { value: cityArr[1][1].toLowerCase(), label: cityArr[1][1] };
    console.log(cityObj['value']);
    console.log(cityObj['label']);
    if (cityArr[0][1] === "CA") {
      result[0].children.push(cityObj);
    } else {
      result[1].children.push(cityObj);
    }
  });
  return result;
}

// const options2 = makeOptions(getAllCities());

function filter(inputValue, path) {
  return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
}

class CreateTripPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      options: [],
      selectedDest: localStorage.getItem('selectedDest').split(','),
      autoFill: makeAutoFill(localStorage.getItem('selectedDest')),
      coolCat: localStorage.getItem('coolCat') === 'true',
      adventurer: localStorage.getItem('adventurer') === 'true',
      entertainer: localStorage.getItem('entertainer') === 'true',
      family: localStorage.getItem('family') === 'true',
      enthusiast: localStorage.getItem('enthusiast') === 'true',
      investigator: localStorage.getItem('investigator') === 'true',
    }

    this.onCheck = this.onCheck.bind(this)

  }

  onCheck() {
    return
  }

  componentDidMount() {
    getAllCities().then(res => {
      this.setState({ options: makeOptions(res) })
      console.log(this.state.selectedDest);
      console.log(this.state.autoFill);

    })
  }



  render() {
    return (
      <Layout>
        <SideBar />
        <Layout className='layout' style={{ background: 'white', marginLeft: 200 }}>
          <Header />

          {/* <Content align='middle' justify='center' style={{ margin: '24px 24px 0', overflow: 'initial', textAlign: 'center' }}>

            <Row align='middle' justify='center'> */}
          <Content style={{ margin: '24px 24px 0', overflow: 'initial', textAlign: 'center' }}>

            <Row justify='center'>

              <Col>

                <div style={{ fontFamily: 'Work Sans' }}>
                  <div style={{ fontSize: '4vh' }}>Create trip.</div>
                  <br />
                  <div style={{ fontSize: '2vh' }}>Enter in details below to describe your trip.</div>
                </div>

                {/* <Card style={{
                  border: '1px solid #000',
                  margin: '10px',
                  background: 'white',
                  height: '50vh',
                  width: '60vh',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'black',
                }}> */}
                <div style={{ marginTop: '50px' }}>
                  <Form
                    {...formItemLayout}
                    initialValues={{
                      destination: this.state.autoFill,
                    }}
                  >
                    <Form.Item
                      name="name"
                      label="Trip Name"
                      rules={[
                        {
                          type: 'name',
                          message: 'Trip name already exists!',
                        },
                        {
                          required: true,
                          message: 'Please enter a trip name!',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      name="destination"
                      label="Destination"
                      rules={[
                        { type: 'array', required: true, message: 'Please select your destination!' },
                      ]}
                    >
                      <Cascader options={this.state.options} onChange={this.onChange} showSearch={{ filter }} placeholder="Select City" />
                    </Form.Item>

                    <Form.Item
                      name="personalities"
                      label="Travel Personality"
                    >
                      <Checkbox.Group
                        onChange={this.onCheck}
                      // defaultValue={ }
                      >
                        <Row>
                          <Col span={8}>
                            <Checkbox value="coolCat">Cool Cat</Checkbox>
                          </Col>
                          <Col span={8}>
                            <Checkbox value="entertainer">Entertainer</Checkbox>
                          </Col>
                          <Col span={8}>
                            <Checkbox value="enthusiast">Enthusiast</Checkbox>
                          </Col>
                          {/* <Col span={8}>
                            <Checkbox value="adventurer">Adventurer</Checkbox>
                          </Col>
                          <Col span={8}>
                            <Checkbox value="family">Family</Checkbox>
                          </Col>
                          <Col span={8}>
                            <Checkbox value="investigator">Investigator</Checkbox>
                          </Col> */}
                        </Row>
                        <Row>
                          {/* <Col span={8}>
                            <Checkbox value="coolCat">Cool Cat</Checkbox>
                          </Col>
                          <Col span={8}>
                            <Checkbox value="entertainer">Entertainer</Checkbox>
                          </Col>
                          <Col span={8}>
                            <Checkbox value="enthusiast">Enthusiast</Checkbox>
                          </Col> */}
                          <Col span={8}>
                            <Checkbox value="adventurer">Adventurer</Checkbox>
                          </Col>
                          <Col span={8}>
                            <Checkbox value="family">Family</Checkbox>
                          </Col>
                          <Col span={8}>
                            <Checkbox value="investigator">Investigator</Checkbox>
                          </Col>
                        </Row>
                      </Checkbox.Group>


                    </Form.Item>

                    <Form.Item
                      name="confirm"
                      valuePropName="checked"
                      rules={[
                        {
                          validator: (_, value) =>
                            value ? Promise.resolve() : Promise.reject(new Error('Check me to confirm your trip details!')),
                        },
                      ]}
                      {...tailFormItemLayout}
                    >
                      <Checkbox>
                        I love these details! Save this trip under My Trips.
                      </Checkbox>
                    </Form.Item>


                  </Form>




                </div>



                <a href="./quiz" style={{ color: "black", marginTop: '50 px' }}>
                  <LeftSquareOutlined /> Go Back
                </a>
                <br />
                <br />

              </Col>
            </Row>
          </Content>

          <Footer />
        </Layout>
      </Layout >
    );
  }
}

export default CreateTripPage

