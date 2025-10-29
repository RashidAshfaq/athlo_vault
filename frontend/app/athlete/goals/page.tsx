"use client"

import { useState } from "react"
import { AthleteLayout } from "@/components/athlete-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Target, Plus, Edit, Trash2, Calendar, Star, CheckCircle, Clock } from "lucide-react"
import { createCareerGoal } from "@/lib/create-goal-api"
import { toast } from "sonner"

interface CareerGoal {
  id: string
  title: string
  description: string
  category: "Professional" | "Achievement" | "Team" | "Business" | "Legacy"
  priority: "High" | "Medium" | "Low"
  progress: number
  targetDate: string
  status: "In Progress" | "Completed" | "On Hold" | "Not Started"
  createdDate: string
  milestones: string[]
}

export default function AthleteGoals() {
  const [goals, setGoals] = useState<CareerGoal[]>([
    {
      id: "1",
      title: "Get drafted in NFL first round",
      description:
        "Achieve first-round draft status in the upcoming NFL draft through exceptional performance and preparation.",
      category: "Professional",
      priority: "High",
      progress: 85,
      targetDate: "2024-04-25",
      status: "In Progress",
      createdDate: "2024-01-15",
      milestones: ["Complete combine preparation", "Maintain top performance", "Meet with scouts"],
    },
    {
      id: "2",
      title: "Secure major endorsement deal",
      description: "Partner with a major sports brand for endorsement opportunities worth $1M+.",
      category: "Business",
      priority: "High",
      progress: 45,
      targetDate: "2024-08-01",
      status: "In Progress",
      createdDate: "2024-02-01",
      milestones: ["Build social media presence", "Network with agents", "Showcase marketability"],
    },
    {
      id: "3",
      title: "Win NFL Rookie of the Year",
      description: "Achieve Rookie of the Year honors in my first NFL season.",
      category: "Achievement",
      priority: "High",
      progress: 0,
      targetDate: "2025-02-01",
      status: "Not Started",
      createdDate: "2024-01-20",
      milestones: ["Get drafted", "Excel in training camp", "Perform consistently"],
    },
    {
      id: "4",
      title: "Lead team to championship",
      description: "Captain the team to a conference championship victory.",
      category: "Team",
      priority: "Medium",
      progress: 60,
      targetDate: "2024-12-01",
      status: "In Progress",
      createdDate: "2024-01-10",
      milestones: ["Maintain team leadership", "Improve team chemistry", "Peak performance in playoffs"],
    },
  ])
  const [isAddingGoal, setIsAddingGoal] = useState(false)
  const [editingGoal, setEditingGoal] = useState<CareerGoal | null>(null)
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    category: "Professional" as const,
    priority: "Medium" as const,
    targetDate: "",
    milestones: [""],
  })

  const handleAddGoal = async () => {
  if (!newGoal.title.trim()) return;

  try {

    const payload = {
  goalTitle: newGoal.title,
  description: newGoal.description,
  category: newGoal.category,
  priority: newGoal.priority,
  targetDate: newGoal.targetDate,
  milestones: (newGoal.milestones || [])
    .filter((m) => m.trim())
    .map((m) => ({ name: m })),
};

const res = await createCareerGoal(payload, localStorage.getItem("access_token") || "");
const response = res.data;

console.log("response is " + response.description);

const newCareerGoal: CareerGoal = {
  id: Date.now().toString(),
  title: response.goalTitle,
  description: response.description,
  category: response.category as CareerGoal["category"],
  priority: response.priority as CareerGoal["priority"],
  targetDate: response.targetDate,
  progress: 0,
  status: "Not Started",
  createdDate: new Date().toISOString().split("T")[0],
  milestones: response.milestones?.map((m) => m.name) || [],
};


    setGoals((prev) => [...prev, newCareerGoal]);

    // Reset the form
    setNewGoal({
      title: "",
      description: "",
      category: "Professional",
      priority: "Medium",
      targetDate: "",
      milestones: [""],
    });

    setIsAddingGoal(false);
    console.log("Goals  Added:", response)

    toast("Created new Goals", {
  description: "Your goals were added successfully."
})
  } catch (error: any) {
    console.error("Creating new goals failed: ", error.message)
   
    toast("Goals Added", {
  description: error.message || "An error occurred while adding new goals."
})
  }
};


  const handleEditGoal = (goal: CareerGoal) => {
    setEditingGoal(goal)
  }

  const handleUpdateGoal = (updatedGoal: CareerGoal) => {
    setGoals(goals.map((g) => (g.id === updatedGoal.id ? updatedGoal : g)))
    setEditingGoal(null)
  }

  const handleDeleteGoal = (goalId: string) => {
    setGoals(goals.filter((g) => g.id !== goalId))
  }

  const addMilestone = () => {
    setNewGoal({
      ...newGoal,
      milestones: [...newGoal.milestones, ""],
    })
  }

  const updateMilestone = (index: number, value: string) => {
    const updatedMilestones = [...newGoal.milestones]
    updatedMilestones[index] = value
    setNewGoal({
      ...newGoal,
      milestones: updatedMilestones,
    })
  }

  const removeMilestone = (index: number) => {
    setNewGoal({
      ...newGoal,
      milestones: newGoal.milestones.filter((_, i) => i !== index),
    })
  }

  const completedGoals = goals.filter((g) => g.status === "Completed").length
  const inProgressGoals = goals.filter((g) => g.status === "In Progress").length
  const averageProgress =
    goals.length > 0 ? Math.round(goals.reduce((sum, g) => sum + g.progress, 0) / goals.length) : 0

  return (
    <AthleteLayout title="Career Goals" description="Set, track, and achieve your professional aspirations">
      {/* Header */}
      <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 mb-6">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Career Goals</h1>
          <p className="text-slate-400">Set, track, and achieve your professional aspirations</p>
        </div>
        <Dialog open={isAddingGoal} onOpenChange={setIsAddingGoal}>
          <DialogTrigger asChild>
            <Button className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold">
              <Plus className="h-4 w-4 mr-2" />
              Add New Goal
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Career Goal</DialogTitle>
              <DialogDescription className="text-slate-400">
                Create a new goal to track your professional progress
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-slate-300">
                  Goal Title
                </Label>
                <Input
                  id="title"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white"
                  placeholder="Enter your goal title"
                />
              </div>
              <div>
                <Label htmlFor="description" className="text-slate-300">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white"
                  placeholder="Describe your goal in detail"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <Label className="text-slate-300">Category</Label>
                  <Select
                    value={newGoal.category}
                    onValueChange={(value: any) => setNewGoal({ ...newGoal, category: value })}
                  >
                    <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="Professional">Professional</SelectItem>
                      <SelectItem value="Achievement">Achievement</SelectItem>
                      <SelectItem value="Team">Team</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                      <SelectItem value="Legacy">Legacy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-slate-300">Priority</Label>
                  <Select
                    value={newGoal.priority}
                    onValueChange={(value: any) => setNewGoal({ ...newGoal, priority: value })}
                  >
                    <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="targetDate" className="text-slate-300">
                    Target Date
                  </Label>
                  <Input
                    id="targetDate"
                    type="date"
                    value={newGoal.targetDate}
                    onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
              </div>
              <div>
                <Label className="text-slate-300">Milestones</Label>
                <div className="space-y-2">
                  {newGoal.milestones.map((milestone, index) => (
                    <div key={index} className="flex space-x-2">
                      <Input
                        value={milestone}
                        onChange={(e) => updateMilestone(index, e.target.value)}
                        className="bg-slate-800 border-slate-700 text-white"
                        placeholder={`Milestone ${index + 1}`}
                      />
                      {newGoal.milestones.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeMilestone(index)}
                          className="border-slate-700 text-slate-300 bg-transparent hover:bg-slate-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addMilestone}
                    className="border-slate-700 text-slate-300 bg-transparent hover:bg-slate-800"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Milestone
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddingGoal(false)}
                className="border-slate-700 text-slate-300 bg-transparent hover:bg-slate-800"
              >
                Cancel
              </Button>
              <Button onClick={handleAddGoal} className="bg-amber-500 hover:bg-amber-600 text-slate-900">
                Add Goal
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Total Goals</CardTitle>
            <Target className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{goals.length}</div>
            <p className="text-xs text-slate-400">Active career goals</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{inProgressGoals}</div>
            <p className="text-xs text-blue-400">Currently working on</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{completedGoals}</div>
            <p className="text-xs text-green-400">Goals achieved</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Avg Progress</CardTitle>
            <Star className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{averageProgress}%</div>
            <p className="text-xs text-amber-400">Overall completion</p>
          </CardContent>
        </Card>
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        {goals.map((goal) => (
          <Card
            key={goal.id}
            className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm hover:bg-slate-800/50 transition-all duration-200"
          >
            <CardContent className="p-6">
              <div className="flex flex-col space-y-4 lg:flex-row lg:items-start lg:justify-between lg:space-y-0">
                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-white font-semibold text-lg">{goal.title}</h3>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        goal.priority === "High"
                          ? "border-red-500 text-red-400"
                          : goal.priority === "Medium"
                            ? "border-amber-500 text-amber-400"
                            : "border-slate-500 text-slate-400"
                      }`}
                    >
                      {goal.priority}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        goal.category === "Professional"
                          ? "border-blue-500 text-blue-400"
                          : goal.category === "Achievement"
                            ? "border-amber-500 text-amber-400"
                            : goal.category === "Team"
                              ? "border-green-500 text-green-400"
                              : goal.category === "Business"
                                ? "border-purple-500 text-purple-400"
                                : "border-slate-500 text-slate-400"
                      }`}
                    >
                      {goal.category}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        goal.status === "Completed"
                          ? "border-green-500 text-green-400"
                          : goal.status === "In Progress"
                            ? "border-blue-500 text-blue-400"
                            : goal.status === "On Hold"
                              ? "border-amber-500 text-amber-400"
                              : "border-slate-500 text-slate-400"
                      }`}
                    >
                      {goal.status}
                    </Badge>
                  </div>

                  <p className="text-slate-300">{goal.description}</p>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-sm">Progress</span>
                      <span className="text-white font-medium">{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                  </div>

                  {goal.milestones.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-slate-400 text-sm font-medium">Milestones:</h4>
                      <ul className="space-y-1">
                        {goal.milestones.map((milestone, index) => (
                          <li key={index} className="text-slate-300 text-sm flex items-center">
                            <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-2"></div>
                            {milestone}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex items-center space-x-4 text-sm text-slate-400">
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Target: {new Date(goal.targetDate).toLocaleDateString()}
                    </span>
                    <span>Created: {new Date(goal.createdDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditGoal(goal)}
                    className="border-slate-700 text-slate-300 bg-transparent hover:bg-slate-800"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteGoal(goal.id)}
                    className="border-red-700 text-red-400 bg-transparent hover:bg-red-900/20"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {goals.length === 0 && (
        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <Target className="h-12 w-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-white font-medium mb-2">No career goals yet</h3>
            <p className="text-slate-400 mb-4">Start by adding your first career goal to track your progress.</p>
            <Button onClick={() => setIsAddingGoal(true)} className="bg-amber-500 hover:bg-amber-600 text-slate-900">
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Goal
            </Button>
          </CardContent>
        </Card>
      )}
    </AthleteLayout>
  )
}
