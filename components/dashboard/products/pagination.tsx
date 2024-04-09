'use client'

import { useCallback } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from '@/lib/utils'

interface Props {
    productsCount: number;
}

export function TablePagination({ productsCount }: Props) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const page = Number(searchParams.get('page'))
    const perPage = Number(searchParams.get('perPage')) || 5
    const countOfPages = Math.ceil(productsCount / perPage)


    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    )

    const goPrev = () => {
        if (page === 2) {
            const newSearchParams = new URLSearchParams(searchParams.toString());
            newSearchParams.delete('page');
            const newUrl = `${pathname}?${newSearchParams.toString()}`;
            router.push(newUrl);
            return;
        }

        if (page) {
            const newPage = Number(page) - 1;
            router.push(pathname + '?' + createQueryString('page', newPage.toString()));

            return;
        }
    }

    const goNext = () => {
        if (countOfPages === page) {
            return;
        }

        if (page) {
            const newPage = page + 1;
            router.push(pathname + '?' + createQueryString('page', newPage.toString()));
        } else {
            router.push(pathname + '?' + createQueryString('page', '2'));

        }
    }

    const setPerPage = (value: string) => {
        router.push(pathname + '?' + createQueryString('perPage', value))
    }

    return (
        <Pagination className="justify-end gap-2">
            <Select defaultValue={`${perPage}`} onValueChange={(value) => setPerPage(value)}>
                <SelectTrigger className="w-[52px] p-[8px]">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="15">15</SelectItem>
                </SelectContent>
            </Select>
            <PaginationContent>
                <PaginationItem className='hover:bg-transparent'>
                    <PaginationPrevious
                        className={cn('cursor-pointer',
                            { 'hover:bg-transparent opacity-50 cursor-auto': !page })}
                        onClick={goPrev}
                    />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext
                        className={cn('cursor-pointer',
                            { 'hover:bg-transparent opacity-50 cursor-auto': countOfPages === page })}
                        onClick={goNext} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
