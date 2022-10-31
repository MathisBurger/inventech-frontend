import type { NextPage } from 'next';
import useApiService from "../hooks/useApiService";
import {useEffect, useState} from "react";
import {ListItem} from "../typings/ListItem";

interface ExtendedListItem extends ListItem {
  code: string;
}

const Home: NextPage = () => {

  const api = useApiService();
  const [listItems, setListItems] = useState<ExtendedListItem[]>([]);
  const [token, setToken] = useState<string|null>(null);

    useEffect(() => {
        setToken(localStorage.getItem("token") ?? '');
    }, [token === null]);

  useEffect(() => {
    const fetcher = async () => {
      const result = await api.itemList(token ?? '');
      if (result.status === '1') {
        const items: ExtendedListItem[] = [];
          console.log(result.items);
          for (let key of Object.keys(result.items)) {
              items.push({...(result.items as any)[key], code: key});
          }
        localStorage.setItem("token", result.token ?? '');
        setListItems(items);
      }
    }
    if (token !== null) {
        fetcher().then();
    }
  }, [token]);


  return (
      <div className="page-container" style={{top: '20%'}}>
          <table className="table" style={{width: '80vw'}}>
              <thead>
              <tr>
                  <th scope="col">Code</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">last check</th>
                  <th scope="col">Location</th>
              </tr>
              </thead>
              <tbody>
              {listItems.map((item) => (
                  <tr>
                      <th scope="row">{item.code}</th>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                      <td>{item.last_check}</td>
                      <td>{item.location}</td>
                  </tr>
              ))}
              </tbody>
          </table>
      </div>
  )
}

export default Home;
