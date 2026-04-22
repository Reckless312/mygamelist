'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { X, Plus, Pencil, CalendarIcon, Minus } from 'lucide-react'
import { createGame, updateGame, Game, GamePayload } from '@/lib'
import { toast } from '@/lib/toast'

type GameFormProps =
    | { mode: 'create' }
    | { mode: 'edit'; game: Game }

const INPUT_CLASS = "bg-[#0a0910] border-gray-700 text-white font-mono placeholder:text-gray-600"

export default function GameForm(props: GameFormProps) {
    const router = useRouter()
    const initial = props.mode === 'edit' ? props.game : null

    const [name, setName] = useState(initial?.name ?? '')
    const [description, setDescription] = useState(initial?.description ?? '')
    const [bannerUrl, setBannerUrl] = useState(initial?.banner_url ?? '')
    const [releaseDate, setReleaseDate] = useState<Date | undefined>(
        initial?.releaseDate ? new Date(initial.releaseDate) : undefined
    )
    const [price, setPrice] = useState<number>(initial?.price ?? 0)
    const [tags, setTags] = useState<string[]>(Array.isArray(initial?.Game_Tags) ? initial.Game_Tags.map(t => t.tag) : [])
    const [tagInput, setTagInput] = useState('')
    const [images, setImages] = useState<string[]>(initial?.Game_Images?.map(i => i.image_url) ?? [])
    const [imageInput, setImageInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {}

        if (name.trim().length < 3) {
            newErrors.name = 'Name must be at least 3 characters'
        }
        if (description.trim().length < 10) {
            newErrors.description = 'Description must be at least 10 characters'
        }
        if (!bannerUrl.trim()) {
            newErrors.banner_url = 'Banner URL is required'
        }
        if (!releaseDate) {
            newErrors.releaseDate = 'Release date is required'
        }
        if (price < 0 || price > 100) {
            newErrors.price = 'Price must be between 0 and 100'
        }
        if (tags.length === 0) {
            newErrors.tags = 'At least one tag is required'
        }
        if (images.length === 0) {
            newErrors.images = 'At least one screenshot is required'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const addTag = () => {
        const trimmed = tagInput.trim()
        if (trimmed.length < 3 || tags.includes(trimmed)) {
            return
        }
        setTags(prev => [...prev, trimmed])
        setTagInput('')
    }

    const addImage = () => {
        const trimmed = imageInput.trim()
        if (!trimmed || images.includes(trimmed)) {
            return
        }
        setImages(prev => [...prev, trimmed])
        setImageInput('')
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validate()) {
            return
        }

        setLoading(true)

        const payload: GamePayload = {
            name: name.trim(),
            description: description.trim(),
            banner_url: bannerUrl.trim(),
            releaseDate: format(releaseDate!, 'yyyy-MM-dd'),
            price,
            tags,
            images,
        }

        let result: Game | null

        if (props.mode === 'edit') {
            result = await updateGame(props.game.id, payload)
        } else {
            result = await createGame(payload)
        }

        setLoading(false)

        if (!result) {
            toast.error(props.mode === 'edit' ? 'Failed to update game' : 'Failed to create game')
            return
        }

        toast.success(props.mode === 'edit' ? `${result.name} updated` : `${result.name} added`)
        router.push(`/game/${result.id}`)
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 flex flex-col gap-6">
            <Card className="bg-[#0F0F14] border border-gray-700 text-white">
                <CardHeader>
                    <CardTitle className="font-mono text-xl">
                        {props.mode === 'edit' ? 'Edit Game' : 'Add New Game'}
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="name" className="font-mono text-gray-300">Name</Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className={INPUT_CLASS}
                            placeholder="e.g. Half-Life 3"
                        />
                        {errors.name && <p className="text-red-400 text-xs font-mono">{errors.name}</p>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="description" className="font-mono text-gray-300">Description</Label>
                        <Textarea
                            id="description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            className={`${INPUT_CLASS} min-h-28`}
                            placeholder="e.g. A survival game set in a post-apocalyptic world"
                        />
                        {errors.description && <p className="text-red-400 text-xs font-mono">{errors.description}</p>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="banner_url" className="font-mono text-gray-300">Steam Banner URL</Label>
                        <Input
                            id="banner_url"
                            value={bannerUrl}
                            onChange={e => setBannerUrl(e.target.value)}
                            className={INPUT_CLASS}
                            placeholder="e.g. https://shared.cloudflare.steamstatic.com/..."
                        />
                        {errors.banner_url && <p className="text-red-400 text-xs font-mono">{errors.banner_url}</p>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <Label className="font-mono text-gray-300">Release Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className={`${INPUT_CLASS} justify-start border hover:bg-[#0a0910] hover:text-white cursor-pointer`}
                                >
                                    <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
                                    {releaseDate ? format(releaseDate, 'yyyy-MM-dd') : <span className="text-gray-600">Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 bg-[#0F0F14] border-gray-700" align="start" side="bottom" avoidCollisions={false}>
                                <Calendar
                                    mode="single"
                                    selected={releaseDate}
                                    onSelect={setReleaseDate}
                                    className="text-white"
                                />
                            </PopoverContent>
                        </Popover>
                        {errors.releaseDate && <p className="text-red-400 text-xs font-mono">{errors.releaseDate}</p>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <Label className="font-mono text-gray-300">Price ($)</Label>
                        <div className="flex items-center">
                            <Input
                                value={price}
                                onChange={e => {
                                    const val = e.target.value.replace(/[^0-9.]/g, '')
                                    const num = parseFloat(val)
                                    if (!isNaN(num)) {
                                        setPrice(Math.min(100, Math.max(0, num)))
                                    } else if (val === '') {
                                        setPrice(0)
                                    }
                                }}
                                className={`${INPUT_CLASS} rounded-r-none border-r-0`}
                            />
                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="h-9 w-9 rounded-none border-gray-700 bg-[#0a0910] hover:bg-gray-800 text-white hover:text-white cursor-pointer shrink-0"
                                onClick={() => setPrice(p => Math.min(100, p + 1))}
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="h-9 w-9 rounded-l-none border-gray-700 bg-[#0a0910] hover:bg-gray-800 text-white hover:text-white cursor-pointer shrink-0"
                                onClick={() => setPrice(p => Math.max(0, p - 1))}
                            >
                                <Minus className="h-4 w-4" />
                            </Button>
                        </div>
                        {errors.price && <p className="text-red-400 text-xs font-mono">{errors.price}</p>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <Label className="font-mono text-gray-300">Tags</Label>
                        <div className="flex gap-2">
                            <Input
                                value={tagInput}
                                onChange={e => setTagInput(e.target.value)}
                                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag() } }}
                                className={INPUT_CLASS}
                                placeholder="e.g. Action"
                            />
                            <Button type="button" onClick={addTag} variant="outline" className="border-gray-700 bg-[#0a0910] hover:bg-gray-800 text-white hover:text-white cursor-pointer">
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                        {tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                                {tags.map(tag => (
                                    <Badge
                                        key={tag}
                                        variant="secondary"
                                        className="font-mono bg-[#2F25B1]/40 text-white border border-[#2F25B1] gap-1 cursor-pointer hover:bg-[#2F25B1]/60"
                                        onClick={() => setTags(prev => prev.filter(t => t !== tag))}
                                    >
                                        {tag} <X className="h-3 w-3" />
                                    </Badge>
                                ))}
                            </div>
                        )}
                        {errors.tags && <p className="text-red-400 text-xs font-mono">{errors.tags}</p>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <Label className="font-mono text-gray-300">Steam Screenshot URLs</Label>
                        <div className="flex gap-2">
                            <Input
                                value={imageInput}
                                onChange={e => setImageInput(e.target.value)}
                                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addImage() } }}
                                className={INPUT_CLASS}
                                placeholder="e.g. https://shared.cloudflare.steamstatic.com/..."
                            />
                            <Button type="button" onClick={addImage} variant="outline" className="border-gray-700 bg-[#0a0910] hover:bg-gray-800 text-white hover:text-white cursor-pointer">
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                        {images.length > 0 && (
                            <div className="flex flex-col gap-1.5 pt-1">
                                {images.map((url, i) => (
                                    <div key={i} className="flex items-center gap-2 bg-[#0a0910] border border-gray-700 rounded px-3 py-1.5">
                                        <span className="text-gray-300 text-xs font-mono truncate flex-1">{url}</span>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="h-5 w-5 text-gray-400 hover:text-red-400 cursor-pointer"
                                            onClick={() => setImages(prev => prev.filter(u => u !== url))}
                                        >
                                            <X className="h-3 w-3" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                        {errors.images && <p className="text-red-400 text-xs font-mono">{errors.images}</p>}
                    </div>

                    <div className="flex gap-3 pt-2">
                        <Button type="submit" disabled={loading} className="bg-[#2F25B1] hover:bg-[#3D32CC] text-white font-mono cursor-pointer flex-1 gap-2">
                            {loading ? (
                                props.mode === 'edit' ? 'Updating...' : 'Adding...'
                            ) : (
                                <>
                                    {props.mode === 'edit' ? <Pencil className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                                    {props.mode === 'edit' ? 'Update Game' : 'Add Game'}
                                </>
                            )}
                        </Button>
                        <Button type="button" variant="outline" onClick={() => router.back()} className="border-gray-700 bg-transparent hover:bg-gray-800 text-white hover:text-white font-mono cursor-pointer gap-2">
                            Cancel
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </form>
    )
}
