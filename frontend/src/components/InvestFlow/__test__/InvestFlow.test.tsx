import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../../../App";
import { rest } from 'msw';
import { setupServer } from "msw/node";
import { InvestFlow } from "../InvestFlow";
import { projectsUrl } from '../../../mocks/handlers'
import userEvent from "@testing-library/user-event";

const server = setupServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('App', () => {
  beforeEach(() => {
    render(<App/>)
  })
  test('renders invest flow at first step', () => {
    const titleElem = screen.getByText(/step 1/i)
    expect(titleElem).toBeInTheDocument();
    const loadingBtn = screen.getByTestId('loading-button')
    expect(loadingBtn).toBeInTheDocument();
  })
})

describe('Invest flow, first step', () => {
  beforeEach(() => {
    render(<InvestFlow/>)
  })

  test('loads projects and lists them', async () => {
    expect(screen.getByTestId('loading-button')).toBeInTheDocument();
    const projectElements = await screen.findAllByTestId('project')
    expect(projectElements.length).toBeGreaterThan(0);
    expect(screen.queryByTestId('loading-button')).not.toBeInTheDocument();
  })

  test('handles server error', async () => {
    server.use(
      rest.get(projectsUrl, (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )
    expect(screen.getByTestId('loading-button')).toBeInTheDocument();
    const projectElements = await screen.findAllByTestId('project')
    expect(projectElements.length).toBeGreaterThan(0);
    expect(screen.queryByTestId('loading-button')).not.toBeInTheDocument();
  })

  test('click on one project leads to step 2', async () => {
    const projectElements = await screen.findAllByTestId('project')
    fireEvent.click(projectElements[0])
    expect(screen.getByText(/step 2/i)).toBeInTheDocument()
  })
})


describe('Invest flow, second step', () => {
  beforeEach(async () => {
    render(<InvestFlow/>);
    const projectElements = await screen.findAllByTestId('project')
    fireEvent.click(projectElements[0])
  })

  test('invalid amount displays validation error and "continue" is disabled', () => {
    expect(screen.getByText(/step 2/i)).toBeInTheDocument()
    userEvent.type(screen.getByPlaceholderText(/investment amount/i), '20000')
    expect(screen.getByText(/200.000/i)).toBeInTheDocument()
    expect(screen.getByRole('button', {name: /continue/i})).toBeDisabled();
  })

  test('valid input enables "continue" button', () => {
    expect(screen.getByText(/step 2/i)).toBeInTheDocument()
    userEvent.type(screen.getByPlaceholderText(/email address/i), 'bogdan@mail.com')
    userEvent.type(screen.getByPlaceholderText(/investment amount/i), '200000')
    expect(screen.queryByText(/200.000/i)).not.toBeInTheDocument()
    expect(screen.getByRole('button', {name: /continue/i})).not.toBeDisabled();
  })

  test('click on "continue" leads to step 3', () => {
    expect(screen.getByText(/step 2/i)).toBeInTheDocument()
    userEvent.type(screen.getByPlaceholderText(/email address/i), 'bogdan@mail.com')
    userEvent.type(screen.getByPlaceholderText(/investment amount/i), '200000')
    fireEvent.click(screen.getByRole('button', {name: /continue/i}))
    expect(screen.getByText(/step 3/i)).toBeInTheDocument()
  })
})

describe('Invest flow, third step', () => {
  beforeEach(async () => {
    render(<InvestFlow/>);
    const projectElements = await screen.findAllByTestId('project')
    fireEvent.click(projectElements[0])
    userEvent.type(screen.getByPlaceholderText(/email address/i), 'bogdan@mail.com')
    userEvent.type(screen.getByPlaceholderText(/investment amount/i), '200000')
    fireEvent.click(screen.getByRole('button', {name: /continue/i}))
  })

  test('displays summary of previous 2 steps', () => {
    expect(screen.getByText(/step 3/i)).toBeInTheDocument()
    expect(screen.getByText(/hamburg tower/i)).toBeInTheDocument()
    expect(screen.getByText(/bogdan@mail.com/i)).toBeInTheDocument()
    expect(screen.getByText(/200000/i)).toBeInTheDocument()
  })

  test('accepting T&C enables "invest" button', () => {
    expect(screen.getByRole('button', {name: /invest/i})).toBeDisabled()
    userEvent.click(screen.getByRole('checkbox'))
    expect(screen.getByRole('button', {name: /invest/i})).not.toBeDisabled()
  })

  test('clicking "invest" button sends request', () => {
    userEvent.click(screen.getByRole('checkbox'))
    userEvent.click(screen.getByRole('button', {name: /invest/i}))
    /* TODO to test this properly and for better UX a confirmation screen has to be displayed:
     * "Your investment request will be processed soon."
     */
  })
})
