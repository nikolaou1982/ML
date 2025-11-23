"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ControlsProps {
  k: number
  setK: (val: number) => void
  onTrain: () => void
  isLoading: boolean
}

export function ClusterControls({ k, setK, onTrain, isLoading }: ControlsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hyperparameters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Algorithm Selection */}
        <div className="space-y-2">
          <Label>Algorithm</Label>
          <Select defaultValue="kmeans">
            <SelectTrigger>
              <SelectValue placeholder="Select algorithm" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kmeans">K-Means</SelectItem>
              <SelectItem value="dbscan">DBSCAN</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* K-Means Slider */}
        <div className="space-y-2">
          <Label>Number of Clusters (k): {k}</Label>
          <Slider
            value={[k]}
            min={2}
            max={10}
            step={1}
            onValueChange={(val: unknown) => {
              const v = Array.isArray(val) ? (val[0] as number | undefined) : (val as number | undefined)
              setK((v ?? k) as number)
            }}
          />
        </div>

        <Button className="w-full" onClick={onTrain} disabled={isLoading}>
          {isLoading ? "Training..." : "Run Model"}
        </Button>
      </CardContent>
    </Card>
  )
}