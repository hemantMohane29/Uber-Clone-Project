/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'

export const SocketContext = React.createContext({
    socketConnected: false,
    sendMessage: () => { },
    receiveMessage: () => () => { },
    joinSocket: () => { }
})

const SocketProvider = ({ children }) => {
    const socketRef = useRef(null)
    const [socketConnected, setSocketConnected] = useState(false)

    const joinSocket = useCallback((userId, userType) => {
        if (!socketRef.current) {
            console.warn('Socket not initialized yet')
            return
        }

        if (!userId || !userType) {
            console.warn('joinSocket requires both userId and userType')
            return
        }

        socketRef.current.emit('join', { userId, userType })
    }, [])

    useEffect(() => {
        const baseUrl = import.meta.env.VITE_SOCKET_URL || import.meta.env.VITE_BASE_URL || 'http://localhost:3001'

        socketRef.current = io(baseUrl, {
            transports: ['websocket'],
            autoConnect: true
        })

        const socket = socketRef.current

        socket.on('connect', () => {
            setSocketConnected(true)
            console.log('Socket connected:', socket.id)

            const storedUserId = localStorage.getItem('userId')
            const storedUserType = localStorage.getItem('userType')
            if (storedUserId && storedUserType) {
                socket.emit('join', { userId: storedUserId, userType: storedUserType })
            }
        })

        socket.on('disconnect', (reason) => {
            setSocketConnected(false)
            console.log('Socket disconnected:', reason)
        })

        socket.on('connect_error', (error) => {
            console.error('Socket connect error:', error)
        })

        return () => {
            if (socket) {
                socket.disconnect()
            }
        }
    }, [])

    const sendMessage = useCallback((eventName, data) => {
        if (!socketRef.current) {
            console.warn('Socket not initialized yet')
            return
        }

        if (!eventName || typeof eventName !== 'string') {
            console.warn('Invalid event name passed to sendMessage')
            return
        }

        socketRef.current.emit(eventName, data)
    }, [])

    const receiveMessage = useCallback((eventName, callback) => {
        if (!socketRef.current) {
            console.warn('Socket not initialized yet')
            return () => { }
        }

        if (!eventName || typeof eventName !== 'string' || typeof callback !== 'function') {
            console.warn('Invalid arguments passed to receiveMessage')
            return () => { }
        }

        socketRef.current.on(eventName, callback)

        return () => {
            if (socketRef.current) {
                socketRef.current.off(eventName, callback)
            }
        }
    }, [])

    return (
        <SocketContext.Provider value={{ socketConnected, sendMessage, receiveMessage, joinSocket }}>
            {children}
        </SocketContext.Provider>
    )
}

export const useSocket = () => React.useContext(SocketContext)

export default SocketProvider
