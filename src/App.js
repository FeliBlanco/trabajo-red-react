

import UserContextProvider from './contexts/userContext';

import RoutesComponent from './RoutesComponent'


function App() {
    return (
        <UserContextProvider>
            <RoutesComponent />
            
        </UserContextProvider>
    );
}

export default App;
