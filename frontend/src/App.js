import "./App.css";
import {
  Button,
  Container,
  Header,
  Input,
  Segment,
  Table,
} from "semantic-ui-react";
import { useState } from "react";
import axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  console.log(query);

  const search = async () => {
    setLoading(true);
    const results = await axios.get("http://localhost:4241/search", {
      params: {
        query,
      },
    });
    setResults(results.data);
    setLoading(false);
  };

  const downloadTorrent = async (magnet) => {
    try {
      await axios.get("http://localhost:4241/add", {
        params: {
          magnet,
        },
      });
      alert("Torrent added");
    } catch (e) {
      console.log(e);
      alert("Error adding torrent");
    }
  };

  console.log(results);

  return (
    <div className="App">
      <Header
        as="h2"
        content="Torrent Search"
        style={{
          margin: "1em",
        }}
        textAlign="center"
      />

      <Container>
        <Segment.Group>
          <Segment>
            <Input
              onChange={(e) => setQuery(e.target.value)}
              style={{ width: "100%" }}
              placeholder="Search..."
            />
          </Segment>
          <Segment>
            <Button
              loading={loading}
              onClick={search}
              style={{ width: "100%" }}
              primary
            >
              Search
            </Button>
          </Segment>
        </Segment.Group>
      </Container>

      <Container>
        <Segment>
          <Table celled padded>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Title</Table.HeaderCell>
                <Table.HeaderCell>Provider</Table.HeaderCell>
                <Table.HeaderCell>Size</Table.HeaderCell>
                <Table.HeaderCell>Seeds/Peers</Table.HeaderCell>
                <Table.HeaderCell>Download</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {results.map((result) => (
                <Table.Row>
                  <Table.Cell>{result.title}</Table.Cell>
                  <Table.Cell singleLine>{result.size}</Table.Cell>
                  <Table.Cell singleLine>{result.provider}</Table.Cell>
                  <Table.Cell>
                    {result.seeds} Seed / {result.peers} Peer
                  </Table.Cell>
                  <Table.Cell>
                    <Button onClick={() => downloadTorrent(result.magnet)}>
                      Download
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Segment>
      </Container>
    </div>
  );
}

export default App;
