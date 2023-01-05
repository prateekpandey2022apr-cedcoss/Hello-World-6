import React, { useEffect, useState } from "react";
import {
  AutoComplete,
  Card,
  FormElement,
  Tag,
  FlexLayout,
  TextStyles,
  Button,
  NewSidebar,
  Alert,
  FlexChild,
} from "@cedcommerce/ounce-ui";
import { ChevronRight, Columns, X } from "react-feather";
import axios from "axios";

const Pros = () => {
  const [search, setSearch] = useState("");
  const [searchOptions, setSearchOptions] = useState([]);
  const [isReqInitiated, setIsReqInitiated] = useState(false);
  const [timeID, setTimeID] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [audience, setAudience] = useState({});

  // server data
  const [data, setData] = useState([]);

  useEffect(() => {
    if (search) {
      doSearch(search);
    }
  }, [search]);

  function removeAudience(key, idx) {
    // console.log(audienceId);
    debugger;
    if (idx !== undefined) {
      //  remove item from the specified key
      audience[key].splice(idx, 1);

      if (audience[key].length === 0) {
        delete audience[key];
      }
    } else {
      delete audience[key];
    }
    setAudience({ ...audience });
  }
  //
  function doSearch() {
    setIsLoading(true);
    clearTimeout(timeID);
    console.log("debounce");

    const id = setTimeout(() => {
      // setIsReqInitiated(true);

      if (window.controller) {
        window.controller.abort();
        console.log("abort");
      }

      window.controller = new AbortController();
      const signal = window.controller.signal;

      axios
        .get(
          `https://testing-app-backend.bwpapps.com/meta/campaign/getAudience?query=${search}&shop_id=796`,
          {
            signal: window.controller.signal,
            headers: {
              authorization:
                "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjM4ODg3ZDQ2NGEwOGE2MmJmMDhhZDNmIiwicm9sZSI6ImN1c3RvbWVyIiwiZXhwIjoxNjcyOTI0NTk4LCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzYjY5NTc2ZGI3YzkwN2ExMDBmYTZmMyJ9.mcbTxpnldFv9IJCgfuckwHaPHWYDJJcwjhQaq85tx2D3J1BrmppoZOtlv6y1WNh05_Y3LxZgtPncZmlm4i8AjdoOe3LJIlLWX7Nku3WzYkocI9_FxloCEEXKSw9eUiMjfh1Ek52Vz_ymVQhEZrmF61ATn7FKn3a7jMDi_5Wl6gJeswKsp1UnEqAWgukux2RRZoHeUN2G7EWRmCqiLPwzbCTWRjKOgWR1KmKazTt4RQMAgtmL18wEPcGcV-DSYGmXMZeT2OZLgKtqH1EdOSRhgsvWlHym3tkYk-7gMxZEAsnSHQpzs8AFf1sX7tBo5EoK90sfcKuQHf2kQo9z1EdgQw",
              "ced-source-id": 795,
              "ced-source-name": "onyx",
              "ced-target-id": 796,
              "ced-target-name": "meta",
              appcode: "eyJvbnl4IjoiYndwIiwibWV0YSI6Im1ldGEifQ==",
              apptag: "bwp_meta",
            },
          }
        )
        .then(function (response) {
          // handle success

          console.log(response);
          const tempSearchOptions = [];
          const tempData = [];
          // debugger;

          if (!response.data.data) {
            throw Error("Error fetching the data");
          }

          setData(response.data.data);
        })
        .catch(function (error) {
          // handle error
          alert(error);
          console.log(error);
        })
        .then(function () {
          // always executed
          setIsLoading(false);
        });
    }, 1000);

    setTimeID(id);
  }

  return (
    <div>
      <FlexLayout
        // desktopWidth="100"
        // mobileWidth="100"
        // childWidth="fullWidth"
        spacing="loose"
        // tabWidth="50"
        valign="start"
        // wrap="noWrap"
      >
        <FlexChild desktopWidth="66" mobileWidth="100" tabWidth="100">
          <Card title="">
            {Object.keys(audience).map((key, idx) => {
              console.log(key);
              // debugger;
              return (
                <div className="mb-15" key={idx}>
                  <Card cardType="Subdued">
                    <div className="mb-15">
                      <TextStyles>{key}</TextStyles>
                    </div>

                    {/* <FlexLayout halign="fill" spacing="extraTight" valign="center"> */}
                    {/* <Card> */}
                    <Card cardType="">
                      <FlexLayout
                        halign="fill"
                        spacing="extraTight"
                        valign="center"
                      >
                        <FlexChild>
                          <FlexLayout spacing="loose" valign="start">
                            {audience[key].map((item, idx) => {
                              return (
                                <Tag
                                  destroy={() => {
                                    console.log(key, idx);
                                    removeAudience(key, idx);
                                  }}
                                  key={idx}
                                >
                                  {item}
                                </Tag>
                              );
                            })}
                          </FlexLayout>
                        </FlexChild>

                        <FlexChild>
                          <Button
                            halign="Center"
                            icon={<X size={18} />}
                            iconAlign="left"
                            length="none"
                            onAction={function noRefCheck() {}}
                            onClick={() => {
                              console.log(key);
                              removeAudience(key);
                            }}
                            thickness="extraThin"
                            type="Outlined"
                          ></Button>
                        </FlexChild>
                      </FlexLayout>
                    </Card>
                    {/* </FlexLayout> */}
                  </Card>
                </div>
              );
            })}

            <FormElement>
              <AutoComplete
                clearButton
                clearFunction={() => {
                  setSearch("");
                }}
                extraClass=""
                value={search}
                name="Name"
                onChange={(e) => {
                  setSearch(e);
                }}
                onClick={(e) => {
                  console.log(e);
                  console.log(data.find((item) => item.name === e));
                  let tempAudience = data.find((item) => item.name === e);

                  // debugger;

                  const child = tempAudience.path.pop();
                  const path = tempAudience.path.join(" > ");
                  if (audience[path] === undefined) {
                    audience[path] = [child];
                  } else {
                    audience[path].push(child);
                  }

                  console.log(audience);

                  setAudience({ ...audience });
                  setSearch("");
                  setData([]);
                }}
                // onEnter={function noRefCheck() {}}
                options={data.map((item, idx) => {
                  return {
                    id: item.id,
                    label: item.name,
                    value: item.name,
                    lname: item.path[0],
                    popoverContent: (
                      <FlexLayout direction="vertical" spacing="loose">
                        <FlexLayout spacing="tight" wrap="noWrap">
                          <TextStyles fontweight="bold">Size :</TextStyles>
                          <TextStyles textcolor="light">
                            {item.audience_size_lower_bound} -{" "}
                            {item.audience_size_upper_bound}
                          </TextStyles>
                        </FlexLayout>
                        <FlexLayout spacing="tight" wrap="noWrap">
                          <TextStyles fontweight="bold">Interests:</TextStyles>
                          <TextStyles textcolor="light">
                            {item.path.join(" > ")}
                          </TextStyles>
                        </FlexLayout>
                        <Alert
                          desciption="The audience size for the selected interest group is shown as a range. These numbers are subject to change over time."
                          type="info"
                        >
                          Alert text
                        </Alert>
                      </FlexLayout>
                    ),
                  };
                })}
                placeHolder="Search Your Items"
                showHelp="Kindly Search your required Item"
                loading={isLoading}
                thickness="thin"
                popoverPosition="right"
                showPopover={true}
              />
            </FormElement>
          </Card>
        </FlexChild>
        <FlexChild desktopWidth="33" mobileWidth="100" tabWidth="100">
          <Card>
            <TextStyles>Preview</TextStyles>
          </Card>
        </FlexChild>
      </FlexLayout>
    </div>
  );
};

export default Pros;
