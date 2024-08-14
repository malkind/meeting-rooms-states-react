import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { Machine } from "./state-machine/simpleStateMachine";
import * as api from "./services/api";
import userEvent from "@testing-library/user-event";

jest.mock("./services/api");
jest.mock("./state-machine/simpleStateMachine");

/* describe("render view based on transitions", () => {
  it("should render loading message", () => {
    Machine.prototype.getState = jest.fn().mockResolvedValue("idle");
    render(<App />);
    const element = screen.getByText("Loading rooms...");
    expect(element).toBeInTheDocument();
  });
  it("should render roomsList component", () => {
    Machine.prototype.getState = jest.fn().mockResolvedValue("viewRooms");
    render(<App />);
    const element = screen.getByTestId("rooms-list");
    expect(element).toBeInTheDocument();
  });
});
 */
describe("App Component", () => {
  let state: string = "";
  beforeEach(() => {
    (api.getConfig as jest.Mock).mockResolvedValue({});
    (api.getRooms as jest.Mock).mockResolvedValue([
      { id: 1, name: "Room 1", meetings: [] },
    ]);
    (Machine as jest.Mock).mockImplementation(() => ({
      transition: jest.fn(),
      getState: () => state,
    }));
  });

  test.only("should show loading message initially", async () => {
    render(<App />);

    expect(screen.getByText("Loading rooms...")).toBeInTheDocument();
  });

  test.only("should display rooms list when state is viewRooms", async () => {
    state = "viewRooms";
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("View Room Meetings")).toBeInTheDocument();
    });
  });
});
