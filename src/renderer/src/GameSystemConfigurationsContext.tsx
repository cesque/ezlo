import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import { GameSystemConfiguration } from 'src/types/GameSystemConfiguration';
import useApi from './hooks/useApi';

type GameSystemConfigurationContextValue = {
    gameSystemConfigurations: GameSystemConfiguration[]
    validConfigurations: GameSystemConfiguration[]
    dispatch: React.Dispatch<GameSystemConfigurationsAction>
}

const GameSystemConfigurationsContext = createContext<GameSystemConfigurationContextValue | undefined>(undefined)

type UpdateConfigurationAction = {
    type: 'UPDATE'
    payload: {
        id: number
        data: Partial<Omit<GameSystemConfiguration, 'id'>>
    }
}

type AddConfigurationAction = {
    type: 'ADD'
    payload: undefined
}

type DeleteConfigurationAction = {
    type: 'DELETE'
    payload: {
        id: number
    }
}

type SetConfigurationsAction = {
    type: 'SET'
    payload: {
        data: GameSystemConfiguration[],
    }
}

type GameSystemConfigurationsAction = UpdateConfigurationAction
    | AddConfigurationAction
    | DeleteConfigurationAction
    | SetConfigurationsAction

const gameSystemConfigurationsReducer = (state: GameSystemConfiguration[], action: GameSystemConfigurationsAction) => {
    switch (action.type) {
        case 'SET':
            return action.payload.data
        case 'ADD':
            let id = 0
            while (state.find(config => config.id == id)) id++
            const newItem: GameSystemConfiguration = {
                id,
                name: '',
                romDirectory: '',
                emulatorPath: '',
            }

            return state.concat([newItem])
        case 'DELETE': return state.filter(configuration => configuration.id != action.payload.id)
        case 'UPDATE': return state.map(configuration => {
            if (configuration.id != action.payload.id) return configuration
            
            return {
                ...configuration,
                ...action.payload.data,
            }
        })
        default:
            return state;
    }
}

export const useGameSystemConfigurations = () => {
    const context = useContext(GameSystemConfigurationsContext)
    if (!context) {
        throw new Error('useGameSystemConfigurations must be used within a GameSystemConfigurationsProvider')
    }
    return context
}

interface Props {
    loadedConfigurations: GameSystemConfiguration[],
}

export function GameSystemConfigurationsProvider({ loadedConfigurations, children }: PropsWithChildren<Props>) {
    const { saveConfigs } = useApi()
    const [gameSystemConfigurations, dispatch] = useReducer(gameSystemConfigurationsReducer, loadedConfigurations)

    useEffect(() => {
        console.log('configs updated, saving')
        saveConfigs(gameSystemConfigurations)
    }, [gameSystemConfigurations])

    const validConfigurations = useMemo(() => {
        return gameSystemConfigurations.filter(config => {
            return config.name
                && config.romDirectory
                && config.emulatorPath
        })
    }, [gameSystemConfigurations])

    const value: GameSystemConfigurationContextValue = {
        gameSystemConfigurations,
        validConfigurations,
        dispatch,
    }

    return (
        <GameSystemConfigurationsContext.Provider value={value}>
            {children}
        </GameSystemConfigurationsContext.Provider>
    )
}

