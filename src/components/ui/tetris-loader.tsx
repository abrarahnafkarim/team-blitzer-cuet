"use client"

import { useState, useEffect, useCallback, useRef } from "react"

// ── Motorsport-themed Tetris pieces ──────────────────────────────────────────
// Each piece is themed after a racing element:
//   F1 car silhouette, Go-kart, Checkered flag, Pit-stop wrench,
//   Steering wheel, Tire barrier, Helmet visor shape
const TETRIS_PIECES = [
  // ── I-piece (straightaway / drag strip) ──
  { shape: [[1, 1, 1, 1]], color: 'bg-red-600 dark:bg-red-500' },
  // ── O-piece (tire / wheel) ──
  { shape: [[1, 1], [1, 1]], color: 'bg-neutral-900 dark:bg-neutral-100' },
  // ── T-piece (podium) ──
  { shape: [[0, 1, 0], [1, 1, 1]], color: 'bg-amber-500 dark:bg-amber-400' },
  // ── L-piece (chicane turn) ──
  { shape: [[1, 0], [1, 0], [1, 1]], color: 'bg-blue-600 dark:bg-blue-400' },
  // ── S-piece (S-curve) ──
  { shape: [[0, 1, 1], [1, 1, 0]], color: 'bg-emerald-600 dark:bg-emerald-400' },
  // ── Z-piece (Z-curve) ──
  { shape: [[1, 1, 0], [0, 1, 1]], color: 'bg-purple-600 dark:bg-purple-400' },
  // ── J-piece (hairpin) ──
  { shape: [[0, 1], [0, 1], [1, 1]], color: 'bg-orange-500 dark:bg-orange-400' },
]

// Racing-themed loading messages
const RACING_MESSAGES = [
  "🏁 Warming up the engine...",
  "🏎️ Pre-race inspection...",
  "🔧 Checking tire pressure...",
  "⛽ Fueling up the tank...",
  "🏁 Aligning the grid...",
  "🏎️ Revving to redline...",
  "🔧 Final pit adjustments...",
  "🏁 Green light in 3... 2... 1...",
  "🏎️ Deploying DRS...",
  "⛽ Box box box...",
]

interface Cell {
  filled: boolean
  color: string
}

interface FallingPiece {
  shape: number[][]
  color: string
  x: number
  y: number
  id: string
}

export interface TetrisLoadingProps {
  size?: 'sm' | 'md' | 'lg'
  speed?: 'slow' | 'normal' | 'fast'
  showLoadingText?: boolean
  loadingText?: string
}

export default function TetrisLoading({
  size = 'md',
  speed = 'normal',
  showLoadingText = true,
  loadingText,
}: TetrisLoadingProps) {
  // Size configurations
  const sizeConfig = {
    sm: { cellSize: 'w-2 h-2', gridWidth: 8, gridHeight: 16, padding: 'p-0.5' },
    md: { cellSize: 'w-3 h-3', gridWidth: 10, gridHeight: 20, padding: 'p-1' },
    lg: { cellSize: 'w-4 h-4', gridWidth: 10, gridHeight: 20, padding: 'p-1.5' },
  }

  // Speed configurations (in milliseconds)
  const speedConfig = {
    slow: 150,
    normal: 80,
    fast: 40,
  }

  const config = sizeConfig[size]
  const fallSpeed = speedConfig[speed]

  const [grid, setGrid] = useState<Cell[][]>(() =>
    Array(config.gridHeight)
      .fill(null)
      .map(() =>
        Array(config.gridWidth)
          .fill(null)
          .map(() => ({ filled: false, color: '' }))
      )
  )
  const [fallingPiece, setFallingPiece] = useState<FallingPiece | null>(null)
  const [isClearing, setIsClearing] = useState(false)
  const [messageIndex, setMessageIndex] = useState(0)
  const frameRef = useRef<number>()
  const lastUpdateRef = useRef<number>(0)

  // Cycle through racing messages
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % RACING_MESSAGES.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  // Rotate a shape 90 degrees clockwise
  const rotateShape = useCallback((shape: number[][]): number[][] => {
    const rows = shape.length
    const cols = shape[0].length
    const rotated: number[][] = Array(cols)
      .fill(null)
      .map(() => Array(rows).fill(0))

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        rotated[j][rows - 1 - i] = shape[i][j]
      }
    }

    return rotated
  }, [])

  // Create a new random piece
  const createNewPiece = useCallback((): FallingPiece => {
    const pieceData = TETRIS_PIECES[Math.floor(Math.random() * TETRIS_PIECES.length)]
    let shape = pieceData.shape

    // Random rotations
    const rotations = Math.floor(Math.random() * 4)
    for (let i = 0; i < rotations; i++) {
      shape = rotateShape(shape)
    }

    const maxX = config.gridWidth - shape[0].length
    const x = Math.floor(Math.random() * (maxX + 1))

    return {
      shape,
      color: pieceData.color,
      x,
      y: -shape.length,
      id: Math.random().toString(36).substr(2, 9),
    }
  }, [rotateShape, config.gridWidth])

  // Check if a piece can be placed at a position
  const canPlacePiece = useCallback(
    (piece: FallingPiece, newX: number, newY: number): boolean => {
      for (let row = 0; row < piece.shape.length; row++) {
        for (let col = 0; col < piece.shape[row].length; col++) {
          if (piece.shape[row][col]) {
            const gridX = newX + col
            const gridY = newY + row

            if (gridX < 0 || gridX >= config.gridWidth || gridY >= config.gridHeight) {
              return false
            }

            if (gridY >= 0 && grid[gridY][gridX].filled) {
              return false
            }
          }
        }
      }
      return true
    },
    [grid, config.gridWidth, config.gridHeight]
  )

  // Place a piece on the grid
  const placePiece = useCallback(
    (piece: FallingPiece) => {
      setGrid((prevGrid) => {
        const newGrid = prevGrid.map((row) => row.map((cell) => ({ ...cell })))

        for (let row = 0; row < piece.shape.length; row++) {
          for (let col = 0; col < piece.shape[row].length; col++) {
            if (piece.shape[row][col]) {
              const gridX = piece.x + col
              const gridY = piece.y + row

              if (gridY >= 0 && gridY < config.gridHeight && gridX >= 0 && gridX < config.gridWidth) {
                newGrid[gridY][gridX] = { filled: true, color: piece.color }
              }
            }
          }
        }

        return newGrid
      })
    },
    [config.gridHeight, config.gridWidth]
  )

  // Clear completed lines with animation
  const clearFullLines = useCallback(() => {
    setGrid((prevGrid) => {
      const linesToClear: number[] = []

      prevGrid.forEach((row, index) => {
        if (row.every((cell) => cell.filled)) {
          linesToClear.push(index)
        }
      })

      if (linesToClear.length > 0) {
        setIsClearing(true)

        const newGrid = prevGrid.map((row, rowIndex) => {
          if (linesToClear.includes(rowIndex)) {
            return row.map((cell) => ({
              ...cell,
              color: 'bg-yellow-400 dark:bg-yellow-300 animate-pulse opacity-60',
            }))
          }
          return row
        })

        setTimeout(() => {
          setGrid((currentGrid) => {
            const filteredGrid = currentGrid.filter((_, index) => !linesToClear.includes(index))
            const emptyRows = Array(linesToClear.length)
              .fill(null)
              .map(() =>
                Array(config.gridWidth)
                  .fill(null)
                  .map(() => ({ filled: false, color: '' }))
              )
            setIsClearing(false)
            return [...emptyRows, ...filteredGrid]
          })
        }, 200)

        return newGrid
      }

      return prevGrid
    })
  }, [config.gridWidth])

  // Check if we need to reset
  const checkAndReset = useCallback(() => {
    const topRows = grid.slice(0, 4)
    const needsReset = topRows.some(
      (row) => row.filter((cell) => cell.filled).length > config.gridWidth * 0.7
    )

    if (needsReset) {
      setIsClearing(true)
      setTimeout(() => {
        setGrid(
          Array(config.gridHeight)
            .fill(null)
            .map(() =>
              Array(config.gridWidth)
                .fill(null)
                .map(() => ({ filled: false, color: '' }))
            )
        )
        setFallingPiece(null)
        setIsClearing(false)
      }, 500)
      return true
    }
    return false
  }, [grid, config.gridWidth, config.gridHeight])

  // Game loop using requestAnimationFrame
  useEffect(() => {
    const gameLoop = (timestamp: number) => {
      if (timestamp - lastUpdateRef.current >= fallSpeed) {
        lastUpdateRef.current = timestamp

        if (!isClearing && !checkAndReset()) {
          setFallingPiece((prevPiece) => {
            if (!prevPiece) {
              return createNewPiece()
            }

            const newY = prevPiece.y + 1

            if (canPlacePiece(prevPiece, prevPiece.x, newY)) {
              return { ...prevPiece, y: newY }
            } else {
              placePiece(prevPiece)
              setTimeout(clearFullLines, 50)
              return createNewPiece()
            }
          })
        }
      }

      frameRef.current = requestAnimationFrame(gameLoop)
    }

    frameRef.current = requestAnimationFrame(gameLoop)

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [canPlacePiece, createNewPiece, placePiece, clearFullLines, checkAndReset, isClearing, fallSpeed])

  // Render the grid
  const renderGrid = () => {
    const displayGrid = grid.map((row) => row.map((cell) => ({ ...cell })))

    // Add falling piece to display
    if (fallingPiece && !isClearing) {
      for (let row = 0; row < fallingPiece.shape.length; row++) {
        for (let col = 0; col < fallingPiece.shape[row].length; col++) {
          if (fallingPiece.shape[row][col]) {
            const gridX = fallingPiece.x + col
            const gridY = fallingPiece.y + row

            if (gridY >= 0 && gridY < config.gridHeight && gridX >= 0 && gridX < config.gridWidth) {
              displayGrid[gridY][gridX] = { filled: true, color: fallingPiece.color }
            }
          }
        }
      }
    }

    return displayGrid.map((row, rowIndex) => (
      <div key={rowIndex} className="flex">
        {row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`${config.cellSize} border border-neutral-300/40 dark:border-neutral-700/40 rounded-[1px] transition-all duration-100 ${
              cell.filled
                ? `${cell.color} scale-100 shadow-sm`
                : 'bg-neutral-50 dark:bg-neutral-950 scale-[0.92]'
            } ${isClearing && rowIndex < 4 ? 'animate-pulse' : ''}`}
          />
        ))}
      </div>
    ))
  }

  const displayText = loadingText || RACING_MESSAGES[messageIndex]

  return (
    <div className="flex flex-col items-center">
      {/* Checkered flag accent */}
      <div className="flex mb-3 gap-[2px]">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 ${i % 2 === 0 ? 'bg-neutral-900 dark:bg-white' : 'bg-white dark:bg-neutral-900'} border border-neutral-300 dark:border-neutral-600`}
          />
        ))}
      </div>

      {/* Tetris grid */}
      <div className="mb-4">
        <div
          className={`border-2 border-neutral-800 dark:border-neutral-300 bg-neutral-50 dark:bg-neutral-950 ${config.padding} rounded-sm shadow-lg transition-colors`}
        >
          {renderGrid()}
        </div>
      </div>

      {/* Checkered flag accent bottom */}
      <div className="flex mb-4 gap-[2px]">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 ${i % 2 !== 0 ? 'bg-neutral-900 dark:bg-white' : 'bg-white dark:bg-neutral-900'} border border-neutral-300 dark:border-neutral-600`}
          />
        ))}
      </div>

      {/* Loading text */}
      {showLoadingText && (
        <div className="text-center">
          <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 transition-all duration-300 min-h-[1.5em]">
            {displayText}
          </p>
        </div>
      )}
    </div>
  )
}
