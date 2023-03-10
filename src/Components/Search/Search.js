import React, { useEffect, useState } from "react";
import { AutoComplete, Card, FormElement } from "@cedcommerce/ounce-ui";
import axios from "axios";

const Search = () => {
  const [search, setSearch] = useState("");
  const [searchOptions, setSearchOptions] = useState([]);
  const [isReqInitiated, setIsReqInitiated] = useState(false);
  const [timeID, setTimeID] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function doSearch(searchTerm) {
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

      //  fetch

      // fetch("https://jsonplaceholder.typicode.com/todos/", { signal })
      //   .then((response) => response.json())
      //   .then((json) => {
      //     setIsReqInitiated(false);
      //     setIsLoading(false);

      //     console.log(json);

      //     const tempSearchOptions = [];
      //     json.forEach((item, idx) => {
      //       tempSearchOptions.push({
      //         id: item.userId,
      //         label: item.title,
      //         value: item.title,
      //       });
      //     });

      //     setSearchOptions([...tempSearchOptions]);
      //   });

      // axios

      // setIsLoading(true);
      //   axios
      //     .get(
      //       `https://jsonplaceholder.typicode.com/todos/?search=${searchTerm}`,
      //       {
      //         signal: window.controller.signal,
      //       }
      //     )
      //     .then(function (response) {
      //       // handle success

      //       console.log(response);
      //       const tempSearchOptions = [];
      //       response.data.forEach((item, idx) => {
      //         tempSearchOptions.push({
      //           id: item.userId,
      //           label: item.title,
      //           value: item.title,
      //         });
      //       });

      //       setSearchOptions([...tempSearchOptions]);
      //     })
      //     .catch(function (error) {
      //       // handle error
      //       console.log(error);
      //     })
      //     .then(function () {
      //       // always executed
      //       setIsLoading(false);
      //     });
      // }, 1000);

      axios
        .get(
          `https://testing-app-backend.bwpapps.com/meta/campaign/getAudience?query=book&shop_id=796`,
          {
            signal: window.controller.signal,
            headers: {
              authorization:
                "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjM4ODg3ZDQ2NGEwOGE2MmJmMDhhZDNmIiwicm9sZSI6ImN1c3RvbWVyIiwiZXhwIjoxNjcyODQ2Mzg2LCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzYjU2M2YyOWU3NzI0OTE1YTA1Zjc2YyJ9.eCWvJqy3ACc_6y1ArqGQwI2hrVH-MJ8LTUeVRGPmD1k5ydiH5Mp7E-W5QmjmFqIRx_qobQBCXdPfuV75UEFotfsN-TxoUpcgi0eH33fb9p6N7jK470gcTrq5aE2sr4_q8kkcudxuCDfF1YgQ8fjEk1sGwzk9NDFBScSjgvAj3G9JqXXC_KrYj9G3XztykRGXYnumeIRQcVCmQXF2-pMlZPlbN1IRxwKuIood-sYrA2KKWg8oFFEFFcAZybeqSk1SH3vh7pEuHirN1BR_5dFsa5RY96yo_LqIT0dh181wsfnlm7bElOUJO16V8NpOqnaAcDWOj7Q-F1jatGnNuqxIlQ",
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
          response.data.forEach((item, idx) => {
            tempSearchOptions.push({
              id: item.userId,
              label: item.title,
              value: item.title,
            });
          });

          setSearchOptions([...tempSearchOptions]);
        })
        .catch(function (error) {
          // handle error
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
      <Card title="Default Vertical Form">
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
              // console.log(e);
              setSearch(e);
              doSearch(e);
            }}
            onClick={function noRefCheck() {}}
            onEnter={function noRefCheck() {}}
            options={searchOptions}
            placeHolder="Search Your Items"
            popoverPosition="right"
            setHiglighted
            showHelp="Kindly Search your required Item"
            showPopover
            loading={isLoading}
          />
        </FormElement>
      </Card>
    </div>
  );
};

export default Search;
