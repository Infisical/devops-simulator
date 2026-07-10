import PixelArt from './PixelArt'
import { PALETTE } from './palette'
import { SCENES, SCENE_WIDTH_PX, SCENE_HEIGHT_PX, type SceneKey } from './scenes'
import { CHARACTER_MOODS, CHARACTER_WIDTH, CHARACTER_HEIGHT, type Mood } from './character'

interface Props {
  scene: SceneKey
  mood: Mood
  className?: string
}

const offsetX = (SCENE_WIDTH_PX - CHARACTER_WIDTH) / 2
const offsetY = SCENE_HEIGHT_PX - CHARACTER_HEIGHT

const characterStyle = {
  left: `${(offsetX / SCENE_WIDTH_PX) * 100}%`,
  top: `${(offsetY / SCENE_HEIGHT_PX) * 100}%`,
  width: `${(CHARACTER_WIDTH / SCENE_WIDTH_PX) * 100}%`,
  height: `${(CHARACTER_HEIGHT / SCENE_HEIGHT_PX) * 100}%`,
}

export default function Scene({ scene, mood, className }: Props) {
  return (
    <div className={`scene-frame ${className ?? ''}`}>
      <PixelArt rows={SCENES[scene]} palette={PALETTE} className="scene-backdrop" />
      <div className="scene-character" style={characterStyle}>
        <PixelArt rows={CHARACTER_MOODS[mood]} palette={PALETTE} />
      </div>
    </div>
  )
}
