// import Cookies from 'js-cookie'
// import { beforeEach, describe, expect, it, vi } from 'vitest'

// const mockLoginResponse = {
//   data: {
//     tokens: {
//       access: 'dummy-access-token',
//       refresh: 'dummy-refresh-token',
//     },
//   },
//   message: 'success',
// }

// beforeEach(() => {
//   vi.clearAllMocks()
//   Cookies.remove('authToken')
//   Cookies.remove('refreshToken')
// })

// describe('Auth Actions', () => {
//   describe('login', () => {
//     it('logs in successfully and returns tokens', async () => {
//       vi.stubGlobal(
//         'fetch',
//         vi.fn().mockResolvedValue({
//           ok: true,
//           json: async () => mockLoginResponse,
//         })
//       )

//       const result = await login('test@example.com', 'password123')

//       expect(fetch).toHaveBeenCalledWith(
//         expect.stringContaining('/auth/login'),
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             email: 'test@example.com',
//             password: 'password123',
//           }),
//         }
//       )
//       expect(result.success).toBe(true)
//       expect(result.token).toBe('dummy-access-token')
//       expect(result.refreshToken).toBe('dummy-refresh-token')
//     })

//     it('handles login failure when response is not ok', async () => {
//       vi.stubGlobal(
//         'fetch',
//         vi.fn().mockResolvedValue({
//           ok: false,
//           statusText: 'Invalid credentials',
//         })
//       )

//       await expect(login('test@example.com', 'wrongpassword')).rejects.toThrow(
//         'Login failed: Invalid credentials'
//       )
//     })

//     it('returns failure for unexpected server response', async () => {
//       const mockInvalidResponse = {
//         message: 'error',
//         data: { tokens: {} },
//       }
//       vi.stubGlobal(
//         'fetch',
//         vi.fn().mockResolvedValue({
//           ok: true,
//           json: async () => mockInvalidResponse,
//         })
//       )

//       const result = await login('test@example.com', 'password123')

//       expect(result.success).toBe(false)
//       expect(result.error).toBe('Unexpected response from the server')
//     })

//     it('throws error when network request fails', async () => {
//       vi.stubGlobal(
//         'fetch',
//         vi.fn().mockRejectedValue(new Error('Network Error'))
//       )

//       await expect(login('test@example.com', 'password123')).rejects.toThrow(
//         'Network Error'
//       )
//     })
//   })

//   describe('logout', () => {
//     it('logs out successfully and removes tokens', async () => {
//       Cookies.set('authToken', 'dummy-access-token')
//       Cookies.set('refreshToken', 'dummy-refresh-token')

//       vi.stubGlobal(
//         'fetch',
//         vi.fn().mockResolvedValue({
//           ok: true,
//         })
//       )

//       const result = await logout()

//       expect(fetch).toHaveBeenCalledWith(
//         expect.stringContaining('/auth/logout'),
//         {
//           method: 'DELETE',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: 'Bearer dummy-access-token',
//           },
//           body: JSON.stringify({
//             refreshToken: 'dummy-refresh-token',
//           }),
//         }
//       )
//       expect(result.success).toBe(true)
//       expect(result.message).toBe('Logout successful')
//       expect(Cookies.get('authToken')).toBeUndefined()
//       expect(Cookies.get('refreshToken')).toBeUndefined()
//     })

//     it('throws error when no refresh token is found', async () => {
//       await expect(logout()).rejects.toThrow('No refresh token found')
//     })

//     it('throws error when logout request fails', async () => {
//       Cookies.set('authToken', 'dummy-access-token')
//       Cookies.set('refreshToken', 'dummy-refresh-token')

//       vi.stubGlobal(
//         'fetch',
//         vi.fn().mockResolvedValue({
//           ok: false,
//         })
//       )

//       await expect(logout()).rejects.toThrow('Logout failed')
//     })

//     it('throws error when network request fails', async () => {
//       Cookies.set('authToken', 'dummy-access-token')
//       Cookies.set('refreshToken', 'dummy-refresh-token')

//       vi.stubGlobal(
//         'fetch',
//         vi.fn().mockRejectedValue(new Error('Network Error'))
//       )

//       await expect(logout()).rejects.toThrow('Network Error')
//     })
//   })
// })
export {};
